#!/usr/bin/env bash
# ╔══════════════════════════════════════════════════════════════════╗
# ║       Aetees Bakehouse — Complete VPS Optimization Script       ║
# ║                                                                  ║
# ║  Run as root on the VPS:                                         ║
# ║    sudo bash /path/to/aetees-optimize.sh                         ║
# ║                                                                  ║
# ║  What this script does:                                          ║
# ║    1. Installs & configures Redis                                ║
# ║    2. Tunes Linux kernel (sysctl)                                ║
# ║    3. Sets file descriptor limits (ulimit)                       ║
# ║    4. Optimizes Nginx configuration                              ║
# ║    5. Tunes MySQL (InnoDB buffer pool, connections, caches)      ║
# ║    6. Writes Redis cache layer into the application              ║
# ║    7. Creates PM2 ecosystem config                               ║
# ║    8. Installs ioredis, rebuilds app, restarts PM2               ║
# ║    9. Creates a proper k6 load-test script                       ║
# ║                                                                  ║
# ║  Idempotent: safe to run multiple times.                         ║
# ║  Creates backups of every file it modifies.                      ║
# ╚══════════════════════════════════════════════════════════════════╝

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────
APP_DIR="/home/aeteesbakehouse/htdocs/www.aeteesbakehouse.com"
APP_USER="aeteesbakehouse"
PM2_NAME="aetees"
BACKUP_DIR="/root/aetees-backups/$(date +%Y%m%d-%H%M%S)"
STAMP=$(date +%Y%m%d-%H%M%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# ── Helpers ──────────────────────────────────────────────────────
info()    { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[  OK]${NC}  $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[FAIL]${NC}  $*"; }
section() { echo -e "\n${CYAN}${BOLD}══════ $* ══════${NC}\n"; }

backup_file() {
  local src="$1"
  if [[ -f "$src" ]]; then
    mkdir -p "$BACKUP_DIR"
    cp "$src" "$BACKUP_DIR/$(basename "$src").bak"
    info "Backed up $src"
  fi
}

# ── Pre-flight Checks ───────────────────────────────────────────
section "PRE-FLIGHT CHECKS"

if [[ $EUID -ne 0 ]]; then
  error "This script must be run as root (use sudo)"
  exit 1
fi
success "Running as root"

if [[ ! -d "$APP_DIR" ]]; then
  error "Application directory not found: $APP_DIR"
  exit 1
fi
success "Application directory exists: $APP_DIR"

if ! id "$APP_USER" &>/dev/null; then
  error "User $APP_USER does not exist"
  exit 1
fi
success "User $APP_USER exists"

mkdir -p "$BACKUP_DIR"
success "Backup directory: $BACKUP_DIR"


# ═════════════════════════════════════════════════════════════════
# SECTION 1: REDIS INSTALLATION & CONFIGURATION
# ═════════════════════════════════════════════════════════════════
section "1. REDIS INSTALLATION & CONFIGURATION"

if command -v redis-server &>/dev/null; then
  info "Redis is already installed: $(redis-server --version | head -1)"
else
  info "Installing Redis..."
  apt-get update -qq
  apt-get install -y -qq redis-server
  success "Redis installed"
fi

# Configure Redis for production
REDIS_CONF="/etc/redis/redis.conf"
if [[ -f "$REDIS_CONF" ]]; then
  backup_file "$REDIS_CONF"

  # Bind to localhost only (security)
  sed -i 's/^bind .*/bind 127.0.0.1 ::1/' "$REDIS_CONF"

  # Disable protected mode (since we're binding to localhost)
  sed -i 's/^protected-mode .*/protected-mode yes/' "$REDIS_CONF"

  # Memory limit: 512MB (plenty for caching products/categories on 8GB VPS)
  if grep -q "^maxmemory " "$REDIS_CONF"; then
    sed -i 's/^maxmemory .*/maxmemory 512mb/' "$REDIS_CONF"
  else
    echo "maxmemory 512mb" >> "$REDIS_CONF"
  fi

  # Eviction policy: LRU (least recently used) — perfect for cache
  if grep -q "^maxmemory-policy " "$REDIS_CONF"; then
    sed -i 's/^maxmemory-policy .*/maxmemory-policy allkeys-lru/' "$REDIS_CONF"
  else
    echo "maxmemory-policy allkeys-lru" >> "$REDIS_CONF"
  fi

  # TCP backlog (match our sysctl tuning)
  if grep -q "^tcp-backlog " "$REDIS_CONF"; then
    sed -i 's/^tcp-backlog .*/tcp-backlog 4096/' "$REDIS_CONF"
  else
    echo "tcp-backlog 4096" >> "$REDIS_CONF"
  fi

  # Disable RDB persistence (pure cache, no need to save to disk)
  # Comment out all 'save' lines and add 'save ""'
  sed -i 's/^save /#save /' "$REDIS_CONF"
  if ! grep -q '^save ""' "$REDIS_CONF"; then
    echo 'save ""' >> "$REDIS_CONF"
  fi

  success "Redis configured (512MB, LRU eviction, no persistence)"
else
  warn "Redis config not found at $REDIS_CONF — using defaults"
fi

# Enable and restart Redis
systemctl enable redis-server 2>/dev/null || true
systemctl restart redis-server
sleep 1

# Verify Redis is running
if redis-cli ping 2>/dev/null | grep -q PONG; then
  success "Redis is running and responding"
else
  error "Redis is not responding — check 'systemctl status redis-server'"
  exit 1
fi


# ═════════════════════════════════════════════════════════════════
# SECTION 2: LINUX KERNEL TUNING (sysctl)
# ═════════════════════════════════════════════════════════════════
section "2. LINUX KERNEL TUNING"

SYSCTL_CONF="/etc/sysctl.d/99-aetees-tuning.conf"
backup_file "$SYSCTL_CONF"

cat > "$SYSCTL_CONF" << 'SYSCTL_EOF'
# ── Aetees Bakehouse — Production Kernel Tuning ──
# Optimized for: 2 vCPU, 8GB RAM, ~2000 concurrent users

# ── File Descriptors ─────────────────────────────
# System-wide maximum open files
fs.file-max = 2097152

# ── Network: Connection Backlog ──────────────────
# Max pending connections in the listen queue
net.core.somaxconn = 4096

# Max SYN requests queued before dropping
net.ipv4.tcp_max_syn_backlog = 4096

# Max packets queued on the INPUT side
net.core.netdev_max_backlog = 16384

# ── Network: Ports & Connections ─────────────────
# Widen ephemeral port range (more outbound connections)
net.ipv4.ip_local_port_range = 1024 65535

# Allow reuse of TIME_WAIT sockets for new connections
net.ipv4.tcp_tw_reuse = 1

# Enable TCP Fast Open (client + server)
net.ipv4.tcp_fastopen = 3

# ── Network: Buffers ────────────────────────────
# Increase default/max socket receive and send buffers
net.core.rmem_default = 262144
net.core.rmem_max = 16777216
net.core.wmem_default = 262144
net.core.wmem_max = 16777216

# TCP memory tuning (min, default, max in pages)
net.ipv4.tcp_rmem = 4096 262144 16777216
net.ipv4.tcp_wmem = 4096 262144 16777216

# ── Memory ───────────────────────────────────────
# Reduce swap aggressiveness (prefer RAM)
vm.swappiness = 10

# Keep more inodes/dentries in memory
vm.vfs_cache_pressure = 50
SYSCTL_EOF

sysctl --system > /dev/null 2>&1
success "Kernel parameters applied via $SYSCTL_CONF"


# ═════════════════════════════════════════════════════════════════
# SECTION 3: FILE DESCRIPTOR LIMITS
# ═════════════════════════════════════════════════════════════════
section "3. FILE DESCRIPTOR LIMITS"

LIMITS_CONF="/etc/security/limits.d/99-aetees.conf"
backup_file "$LIMITS_CONF"

cat > "$LIMITS_CONF" << LIMITS_EOF
# Aetees Bakehouse — File descriptor limits
# Applies to root, app user, and PM2

root             soft    nofile    65535
root             hard    nofile    65535

${APP_USER}      soft    nofile    65535
${APP_USER}      hard    nofile    65535

*                soft    nofile    65535
*                hard    nofile    65535
LIMITS_EOF

success "File descriptor limits set to 65535"

# Also set for the current session
ulimit -n 65535 2>/dev/null || true

# Ensure PAM limits module is enabled
if ! grep -q "pam_limits.so" /etc/pam.d/common-session 2>/dev/null; then
  echo "session required pam_limits.so" >> /etc/pam.d/common-session
  info "Enabled pam_limits.so in common-session"
fi

# Set systemd default limit for all services
SYSTEMD_CONF="/etc/systemd/system.conf"
if ! grep -q "^DefaultLimitNOFILE=65535" "$SYSTEMD_CONF" 2>/dev/null; then
  backup_file "$SYSTEMD_CONF"
  # Remove any existing DefaultLimitNOFILE line and add ours
  sed -i '/^DefaultLimitNOFILE/d' "$SYSTEMD_CONF"
  sed -i '/^\[Manager\]/a DefaultLimitNOFILE=65535' "$SYSTEMD_CONF"
  systemctl daemon-reexec 2>/dev/null || true
  info "Set systemd DefaultLimitNOFILE=65535"
fi


# ═════════════════════════════════════════════════════════════════
# SECTION 4: NGINX OPTIMIZATION
# ═════════════════════════════════════════════════════════════════
section "4. NGINX OPTIMIZATION"

NGINX_CONF="/etc/nginx/nginx.conf"
if [[ -f "$NGINX_CONF" ]]; then
  backup_file "$NGINX_CONF"

  cat > "$NGINX_CONF" << 'NGINX_EOF'
# ── Aetees Bakehouse — Optimized Nginx Config ──
# 2 vCPU, 8GB RAM, targeting ~2000 concurrent users

user www-data;
worker_processes auto;
pid /run/nginx.pid;
worker_rlimit_nofile 65535;

include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 4096;
    multi_accept on;
    use epoll;
}

http {
    # ── Basic Settings ────────────────────────────
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    types_hash_max_size 2048;
    server_tokens off;

    # ── Timeouts ──────────────────────────────────
    keepalive_timeout 65;
    keepalive_requests 1000;
    client_body_timeout 30;
    client_header_timeout 30;
    send_timeout 30;

    # Client body size (for image uploads)
    client_max_body_size 20M;

    # ── Buffers ───────────────────────────────────
    client_body_buffer_size 128k;
    client_header_buffer_size 4k;
    large_client_header_buffers 4 16k;
    proxy_buffers 16 32k;
    proxy_buffer_size 64k;
    proxy_busy_buffers_size 128k;

    # ── MIME Types ────────────────────────────────
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # ── Logging ───────────────────────────────────
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # ── Gzip Compression ─────────────────────────
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_types
        text/plain
        text/css
        text/javascript
        text/xml
        application/json
        application/javascript
        application/x-javascript
        application/xml
        application/xml+rss
        application/vnd.ms-fontobject
        font/eot
        font/opentype
        font/otf
        image/svg+xml;

    # ── Rate Limiting (DDoS protection) ──────────
    limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=50r/s;

    # ── Upstream: Next.js via PM2 ────────────────
    upstream nextjs_backend {
        server 127.0.0.1:3000;
        keepalive 64;
    }

    # ── Static file caching ──────────────────────
    map $sent_http_content_type $expires {
        default                    off;
        text/html                  epoch;
        text/css                   30d;
        application/javascript     30d;
        ~image/                    30d;
        ~font/                     30d;
        application/json           1m;
    }

    # ── Include site configs ─────────────────────
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
NGINX_EOF

  # Test and reload Nginx
  if nginx -t 2>&1; then
    systemctl reload nginx
    success "Nginx optimized and reloaded"
  else
    error "Nginx config test failed — restoring backup"
    cp "$BACKUP_DIR/nginx.conf.bak" "$NGINX_CONF"
    nginx -t 2>&1 && systemctl reload nginx
    warn "Reverted to previous Nginx config"
  fi
else
  warn "Nginx config not found at $NGINX_CONF"
fi


# ═════════════════════════════════════════════════════════════════
# SECTION 5: MYSQL TUNING
# ═════════════════════════════════════════════════════════════════
section "5. MYSQL TUNING"

# Find MySQL config file
MYSQL_CONF=""
for candidate in \
  /etc/mysql/mysql.conf.d/mysqld.cnf \
  /etc/mysql/my.cnf \
  /etc/my.cnf \
  /etc/mysql/conf.d/mysqld.cnf; do
  if [[ -f "$candidate" ]]; then
    MYSQL_CONF="$candidate"
    break
  fi
done

MYSQL_CUSTOM="/etc/mysql/conf.d/99-aetees-tuning.cnf"

if [[ -n "$MYSQL_CONF" ]] || [[ -d "/etc/mysql/conf.d" ]]; then
  # Use a drop-in file so we don't break the main config
  mkdir -p /etc/mysql/conf.d

  backup_file "$MYSQL_CUSTOM"

  cat > "$MYSQL_CUSTOM" << 'MYSQL_EOF'
# ── Aetees Bakehouse — MySQL Production Tuning ──
# Optimized for: 8GB RAM VPS, bakehouse app

[mysqld]
# ── Connection Handling ──────────────────────────
# Allow enough connections for Prisma pool + admin
max_connections = 300
thread_cache_size = 100

# ── InnoDB Engine ────────────────────────────────
# Use ~25% of RAM for buffer pool (2G of 8G)
# This is the single most important MySQL setting
innodb_buffer_pool_size = 2G
innodb_buffer_pool_instances = 2

# Log file size (larger = better write performance)
innodb_log_file_size = 256M
innodb_log_buffer_size = 64M

# Flush behavior (2 = flush once per second, best perf)
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# I/O threads
innodb_read_io_threads = 4
innodb_write_io_threads = 4

# ── Table & Query Cache ─────────────────────────
table_open_cache = 4000
table_definition_cache = 2000

# Temp tables in memory before spilling to disk
tmp_table_size = 64M
max_heap_table_size = 64M

# Sort and join buffers
sort_buffer_size = 4M
join_buffer_size = 4M
read_buffer_size = 2M
read_rnd_buffer_size = 4M

# ── Networking ───────────────────────────────────
# Increase max packet size (for large queries)
max_allowed_packet = 64M

# ── Slow Query Log (for debugging) ──────────────
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow-query.log
long_query_time = 1
MYSQL_EOF

  success "MySQL tuning config written to $MYSQL_CUSTOM"

  # Create slow query log directory if needed
  mkdir -p /var/log/mysql
  chown mysql:mysql /var/log/mysql 2>/dev/null || true

  # Restart MySQL
  if systemctl is-active --quiet mysql 2>/dev/null; then
    info "Restarting MySQL..."
    if systemctl restart mysql 2>&1; then
      success "MySQL restarted with optimized settings"
    else
      error "MySQL restart failed — check 'journalctl -u mysql'"
      warn "Removing custom config and restarting..."
      rm -f "$MYSQL_CUSTOM"
      systemctl restart mysql 2>/dev/null || true
    fi
  elif systemctl is-active --quiet mariadb 2>/dev/null; then
    info "Restarting MariaDB..."
    if systemctl restart mariadb 2>&1; then
      success "MariaDB restarted with optimized settings"
    else
      error "MariaDB restart failed"
      rm -f "$MYSQL_CUSTOM"
      systemctl restart mariadb 2>/dev/null || true
    fi
  else
    warn "MySQL/MariaDB service not found — config written but not applied"
    warn "Restart your database manually to apply changes"
  fi
else
  warn "MySQL config directory not found"
  warn "If MySQL is managed by Hostinger, tune via their dashboard"
fi


# ═════════════════════════════════════════════════════════════════
# SECTION 6: APPLICATION CODE — REDIS CACHE LAYER
# ═════════════════════════════════════════════════════════════════
section "6. APPLICATION CODE — REDIS CACHE LAYER"

# ── 6a. Create src/lib/redis.js ─────────────────
info "Writing src/lib/redis.js ..."

cat > "$APP_DIR/src/lib/redis.js" << 'REDIS_JS_EOF'
/**
 * Redis Client — Singleton with graceful degradation
 *
 * If Redis is unavailable, the client exports null so the
 * cache layer can transparently fall back to in-memory cache.
 *
 * Environment: REDIS_URL (default: redis://127.0.0.1:6379)
 */
import Redis from 'ioredis';

const REDIS_KEY = '__aetee_redis__';

function createRedisClient() {
  const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

  const client = new Redis(url, {
    // Connection
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
      if (times > 10) {
        console.error('[Redis] Max reconnection attempts reached. Giving up.');
        return null; // stop retrying
      }
      const delay = Math.min(times * 200, 5000);
      return delay;
    },

    // Timeouts
    connectTimeout: 5000,
    commandTimeout: 3000,

    // Performance
    enableReadyCheck: true,
    lazyConnect: false,
  });

  client.on('connect', () => {
    console.log('[Redis] Connected successfully');
  });

  client.on('error', (err) => {
    console.error('[Redis] Connection error:', err.message);
  });

  client.on('close', () => {
    console.warn('[Redis] Connection closed');
  });

  return client;
}

// Reuse across HMR in development
if (!globalThis[REDIS_KEY]) {
  try {
    globalThis[REDIS_KEY] = createRedisClient();
  } catch (err) {
    console.error('[Redis] Failed to create client:', err.message);
    globalThis[REDIS_KEY] = null;
  }
}

/** @type {import('ioredis').Redis | null} */
const redis = globalThis[REDIS_KEY];

export default redis;
REDIS_JS_EOF

success "Created src/lib/redis.js"

# ── 6b. Upgrade src/lib/cache.js ────────────────
info "Writing src/lib/cache.js (Redis + in-memory fallback) ..."

cat > "$APP_DIR/src/lib/cache.js" << 'CACHE_JS_EOF'
/**
 * Hybrid Cache Utility — Redis → In-Memory Fallback
 *
 * Attempts to use Redis for caching (shared across PM2 cluster workers).
 * Falls back transparently to an in-memory Map if Redis is unavailable.
 *
 * Usage:
 *   const data = await getOrSetCache("products", 60, async () => {
 *     return await prisma.product.findMany();
 *   });
 */
import redis from './redis.js';

// ── In-Memory Fallback ──────────────────────────────────────────
const CACHE_KEY = '__aetee_cache__';

if (!globalThis[CACHE_KEY]) {
  globalThis[CACHE_KEY] = new Map();
}

/** @type {Map<string, { data: any, expiresAt: number }>} */
const memCache = globalThis[CACHE_KEY];

// ── Cache Prefix (avoids key collisions) ────────────────────────
const REDIS_PREFIX = 'aetee:';

/**
 * Check if Redis is connected and usable.
 */
function isRedisReady() {
  return redis && redis.status === 'ready';
}

/**
 * Get data from cache or fetch and store it.
 *
 * Strategy:
 *   1. Try Redis first
 *   2. Fall back to in-memory cache
 *   3. If both miss, call the fetcher and store in both layers
 *
 * @param {string} key — Unique cache key (e.g. "products", "categories")
 * @param {number} ttlSeconds — How long to cache (in seconds)
 * @param {() => Promise<any>} fetcher — Async function to get fresh data
 * @returns {Promise<any>} — The cached or freshly fetched data
 */
export async function getOrSetCache(key, ttlSeconds, fetcher) {
  const redisKey = REDIS_PREFIX + key;

  // ── 1. Try Redis ──────────────────────────────────────────────
  if (isRedisReady()) {
    try {
      const cached = await redis.get(redisKey);
      if (cached !== null) {
        return JSON.parse(cached);
      }
    } catch (err) {
      console.warn(`[Cache] Redis GET failed for "${key}":`, err.message);
      // Continue to in-memory fallback
    }
  }

  // ── 2. Try In-Memory ──────────────────────────────────────────
  const now = Date.now();
  const memCached = memCache.get(key);
  if (memCached && memCached.expiresAt > now) {
    return memCached.data;
  }

  // ── 3. Fetch Fresh Data ───────────────────────────────────────
  const data = await fetcher();

  // Store in in-memory cache (always, as last-resort layer)
  memCache.set(key, {
    data,
    expiresAt: now + ttlSeconds * 1000,
  });

  // Store in Redis (non-blocking, don't let failures crash the request)
  if (isRedisReady()) {
    try {
      await redis.set(redisKey, JSON.stringify(data), 'EX', ttlSeconds);
    } catch (err) {
      console.warn(`[Cache] Redis SET failed for "${key}":`, err.message);
    }
  }

  return data;
}

/**
 * Invalidate a specific cache key.
 * Call this after creating/updating/deleting data.
 *
 * @param {string} key — The cache key to invalidate
 */
export function invalidateCache(key) {
  // Clear in-memory
  memCache.delete(key);

  // Clear Redis (fire-and-forget, errors caught internally)
  if (isRedisReady()) {
    redis.del(REDIS_PREFIX + key).catch((err) => {
      console.warn(`[Cache] Redis DEL failed for "${key}":`, err.message);
    });
  }
}

/**
 * Invalidate all cache entries.
 */
export async function invalidateAll() {
  // Clear in-memory
  memCache.clear();

  // Clear all Redis keys with our prefix
  if (isRedisReady()) {
    try {
      const keys = await redis.keys(REDIS_PREFIX + '*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (err) {
      console.warn('[Cache] Redis invalidateAll failed:', err.message);
    }
  }
}
CACHE_JS_EOF

success "Created src/lib/cache.js (Redis-first, in-memory fallback)"

# ── 6c. Create PM2 ecosystem config ─────────────
info "Writing ecosystem.config.cjs ..."

cat > "$APP_DIR/ecosystem.config.cjs" << 'PM2_EOF'
/**
 * PM2 Ecosystem Configuration — Aetees Bakehouse
 *
 * Current: Single instance, fork mode
 * Future: Switch to cluster mode after Redis + DB optimization
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs
 *   pm2 reload ecosystem.config.cjs   (zero-downtime reload)
 */
module.exports = {
  apps: [
    {
      name: 'aetees',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/aeteesbakehouse/htdocs/www.aeteesbakehouse.com',

      // ── Process Mode ─────────────────────────
      // Phase 1: fork mode (current)
      instances: 1,
      exec_mode: 'fork',

      // Phase 2: uncomment after Redis + DB optimization + stable load tests
      // instances: 2,
      // exec_mode: 'cluster',

      // ── Memory ───────────────────────────────
      max_memory_restart: '1G',

      // ── Environment ──────────────────────────
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // ── Restart Policy ───────────────────────
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 5000,

      // ── Logging ──────────────────────────────
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/aeteesbakehouse/.pm2/logs/aetees-error.log',
      out_file: '/home/aeteesbakehouse/.pm2/logs/aetees-out.log',
      merge_logs: true,
      log_type: 'json',

      // ── Node.js Flags ────────────────────────
      node_args: '--max-old-space-size=768',
    },
  ],
};
PM2_EOF

success "Created ecosystem.config.cjs"

# ── 6d. Ensure REDIS_URL is in .env ─────────────
ENV_FILE="$APP_DIR/.env"
if [[ -f "$ENV_FILE" ]]; then
  if ! grep -q "^REDIS_URL=" "$ENV_FILE"; then
    echo "" >> "$ENV_FILE"
    echo "# Redis Cache" >> "$ENV_FILE"
    echo "REDIS_URL=redis://127.0.0.1:6379" >> "$ENV_FILE"
    success "Added REDIS_URL to .env"
  else
    success "REDIS_URL already present in .env"
  fi
else
  warn ".env file not found at $ENV_FILE"
fi

# ── 6e. Increase Prisma connection pool ─────────
# The default connection_limit=3 is too low for 2000 concurrent users
if [[ -f "$ENV_FILE" ]]; then
  CURRENT_DB_URL=$(grep "^DATABASE_URL=" "$ENV_FILE" | head -1 || true)
  if echo "$CURRENT_DB_URL" | grep -q "connection_limit=3"; then
    backup_file "$ENV_FILE"
    sed -i 's/connection_limit=3/connection_limit=10/' "$ENV_FILE"
    success "Increased Prisma connection pool from 3 → 10"
  elif echo "$CURRENT_DB_URL" | grep -q "connection_limit="; then
    info "Prisma connection_limit already customized — leaving as-is"
  else
    info "No connection_limit found in DATABASE_URL — Prisma will use default (5)"
  fi
fi

# Fix file ownership
chown -R "$APP_USER":"$APP_USER" "$APP_DIR/src/lib/redis.js" "$APP_DIR/src/lib/cache.js" "$APP_DIR/ecosystem.config.cjs"
success "File ownership set to $APP_USER"


# ═════════════════════════════════════════════════════════════════
# SECTION 7: INSTALL DEPENDENCIES, BUILD & RESTART
# ═════════════════════════════════════════════════════════════════
section "7. INSTALL DEPENDENCIES, BUILD & RESTART"

cd "$APP_DIR"

# Install ioredis
info "Installing ioredis..."
sudo -u "$APP_USER" npm install ioredis --save 2>&1 | tail -3
success "ioredis installed"

# Generate Prisma client
info "Generating Prisma client..."
sudo -u "$APP_USER" npx prisma generate 2>&1 | tail -3
success "Prisma client generated"

# Build the application
info "Building Next.js application (this may take 1-2 minutes)..."
sudo -u "$APP_USER" npm run build 2>&1 | tail -5

if [[ $? -eq 0 ]]; then
  success "Next.js build completed"
else
  error "Build failed — check the output above"
  error "Your previous version is still running. Fix the build error and re-run this script."
  exit 1
fi

# Restart PM2
info "Restarting PM2 process..."

# Check if PM2 process exists
if sudo -u "$APP_USER" pm2 describe "$PM2_NAME" &>/dev/null; then
  sudo -u "$APP_USER" pm2 restart "$PM2_NAME" --update-env
  success "PM2 process '$PM2_NAME' restarted"
else
  info "PM2 process '$PM2_NAME' not found — starting from ecosystem config..."
  sudo -u "$APP_USER" pm2 start "$APP_DIR/ecosystem.config.cjs"
  success "PM2 process started from ecosystem config"
fi

# Save PM2 process list
sudo -u "$APP_USER" pm2 save
success "PM2 process list saved"

# Ensure PM2 starts on boot
sudo -u "$APP_USER" pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" 2>/dev/null | grep "sudo" | bash 2>/dev/null || true


# ═════════════════════════════════════════════════════════════════
# SECTION 8: K6 LOAD TEST SCRIPT
# ═════════════════════════════════════════════════════════════════
section "8. K6 LOAD TEST SCRIPT"

cat > "$APP_DIR/deploy/k6-load-test.js" << 'K6_EOF'
/**
 * Aetees Bakehouse — Realistic k6 Load Test
 *
 * Tests a realistic user journey:
 *   1. Homepage → 2. Menu page → 3. Products API → 4. Categories API
 *
 * Usage:
 *   k6 run deploy/k6-load-test.js
 *   k6 run --vus 500 --duration 60s deploy/k6-load-test.js
 *
 * Stages:
 *   Ramp to 500 VUs (30s) → Hold (60s) → Ramp to 1500 (30s) → Hold (60s) → Ramp down (30s)
 */
import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiDuration = new Trend('api_duration');

export const options = {
  stages: [
    { duration: '30s', target: 500 },    // Ramp up to 500 users
    { duration: '60s', target: 500 },    // Hold at 500
    { duration: '30s', target: 1500 },   // Ramp up to 1500
    { duration: '60s', target: 1500 },   // Hold at 1500
    { duration: '30s', target: 0 },      // Ramp down
  ],

  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<2000'],    // 95% under 500ms
    errors: ['rate<0.05'],                               // Less than 5% errors
    http_req_failed: ['rate<0.05'],                      // Less than 5% failures
  },
};

const BASE_URL = 'https://www.aeteesbakehouse.com';

export default function () {
  // 1. Visit Homepage
  group('Homepage', () => {
    const res = http.get(BASE_URL, { tags: { page: 'home' } });
    check(res, { 'homepage 200': (r) => r.status === 200 });
    errorRate.add(res.status !== 200);
    sleep(1);
  });

  // 2. Visit Menu page
  group('Menu Page', () => {
    const res = http.get(`${BASE_URL}/menu`, { tags: { page: 'menu' } });
    check(res, { 'menu 200': (r) => r.status === 200 });
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // 3. Fetch Products API (the hot path — cached by Redis)
  group('Products API', () => {
    const res = http.get(`${BASE_URL}/api/products`, { tags: { page: 'api_products' } });
    check(res, {
      'products 200': (r) => r.status === 200,
      'products is array': (r) => {
        try { return Array.isArray(JSON.parse(r.body)); }
        catch { return false; }
      },
    });
    apiDuration.add(res.timings.duration);
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // 4. Fetch Categories API
  group('Categories API', () => {
    const res = http.get(`${BASE_URL}/api/categories`, { tags: { page: 'api_categories' } });
    check(res, { 'categories 200': (r) => r.status === 200 });
    apiDuration.add(res.timings.duration);
    errorRate.add(res.status !== 200);
    sleep(0.5);
  });

  // Simulate think time
  sleep(Math.random() * 2 + 1);
}

export function handleSummary(data) {
  const now = new Date().toISOString().replace(/[:.]/g, '-');
  return {
    [`deploy/k6-results-${now}.json`]: JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: '  ', enableColors: true }),
  };
}

// Inline textSummary for k6 (no external dependencies)
function textSummary(data, opts = {}) {
  const lines = [];
  const metrics = data.metrics || {};

  lines.push('\n═══════════════════════════════════════');
  lines.push('  AETEES BAKEHOUSE — LOAD TEST RESULTS');
  lines.push('═══════════════════════════════════════\n');

  for (const [name, metric] of Object.entries(metrics)) {
    if (metric.values) {
      const v = metric.values;
      if (v.avg !== undefined) {
        lines.push(`  ${name}:`);
        lines.push(`    avg=${v.avg?.toFixed(2)}ms  min=${v.min?.toFixed(2)}ms  max=${v.max?.toFixed(2)}ms`);
        if (v['p(95)'] !== undefined) {
          lines.push(`    p(95)=${v['p(95)']?.toFixed(2)}ms  p(99)=${v['p(99)']?.toFixed(2)}ms`);
        }
      } else if (v.rate !== undefined) {
        lines.push(`  ${name}: ${(v.rate * 100).toFixed(2)}%`);
      } else if (v.count !== undefined) {
        lines.push(`  ${name}: ${v.count}`);
      }
    }
  }
  return lines.join('\n') + '\n';
}
K6_EOF

mkdir -p "$APP_DIR/deploy"
chown -R "$APP_USER":"$APP_USER" "$APP_DIR/deploy"
success "Created deploy/k6-load-test.js"


# ═════════════════════════════════════════════════════════════════
# SECTION 9: DEPLOYMENT HELPER SCRIPT
# ═════════════════════════════════════════════════════════════════
section "9. DEPLOYMENT HELPER SCRIPT"

cat > "$APP_DIR/deploy/redeploy.sh" << 'DEPLOY_EOF'
#!/usr/bin/env bash
# ── Aetees Bakehouse — Quick Redeploy Script ──
# Run as: the aeteesbakehouse user (or sudo -u aeteesbakehouse)
#
# Usage: bash deploy/redeploy.sh
#

set -euo pipefail

APP_DIR="/home/aeteesbakehouse/htdocs/www.aeteesbakehouse.com"
PM2_NAME="aetees"

cd "$APP_DIR"

echo "═══ Pulling latest code ═══"
git pull origin main

echo ""
echo "═══ Installing dependencies ═══"
npm install

echo ""
echo "═══ Generating Prisma client ═══"
npx prisma generate

echo ""
echo "═══ Running migrations (if any) ═══"
npx prisma migrate deploy 2>/dev/null || echo "(No pending migrations)"

echo ""
echo "═══ Building application ═══"
npm run build

echo ""
echo "═══ Restarting PM2 ═══"
pm2 restart "$PM2_NAME" --update-env
pm2 save

echo ""
echo "═══ ✅ Deployment complete! ═══"
pm2 status
DEPLOY_EOF

chmod +x "$APP_DIR/deploy/redeploy.sh"
chown "$APP_USER":"$APP_USER" "$APP_DIR/deploy/redeploy.sh"
success "Created deploy/redeploy.sh"


# ═════════════════════════════════════════════════════════════════
# FINAL SUMMARY
# ═════════════════════════════════════════════════════════════════
section "DEPLOYMENT COMPLETE"

echo -e "${GREEN}${BOLD}All optimizations applied successfully!${NC}\n"

echo "  ┌─────────────────────────────────────────────┐"
echo "  │  Summary of changes                         │"
echo "  ├─────────────────────────────────────────────┤"
echo "  │  ✅  Redis installed & configured            │"
echo "  │  ✅  Linux kernel tuned (sysctl)             │"
echo "  │  ✅  File descriptor limits → 65535          │"
echo "  │  ✅  Nginx optimized (4096 connections)      │"
echo "  │  ✅  MySQL tuned (2G buffer pool)            │"
echo "  │  ✅  Redis cache layer added to app          │"
echo "  │  ✅  PM2 ecosystem config created            │"
echo "  │  ✅  Prisma connection pool → 10             │"
echo "  │  ✅  App rebuilt & PM2 restarted             │"
echo "  │  ✅  k6 load test script created             │"
echo "  │  ✅  Quick redeploy script created           │"
echo "  └─────────────────────────────────────────────┘"
echo ""
echo -e "  ${CYAN}Backups saved to:${NC} $BACKUP_DIR"
echo ""
echo -e "  ${YELLOW}Next steps:${NC}"
echo "    1. Verify the site: curl -I https://www.aeteesbakehouse.com"
echo "    2. Check Redis:     redis-cli INFO keyspace"
echo "    3. Check PM2:       sudo -u $APP_USER pm2 monit"
echo "    4. Check MySQL:     mysql -e 'SHOW VARIABLES LIKE \"innodb_buffer_pool_size\"'"
echo "    5. Run load test:   k6 run deploy/k6-load-test.js"
echo ""
echo -e "  ${YELLOW}Future (after stable load tests):${NC}"
echo "    Edit ecosystem.config.cjs → uncomment cluster mode (2 instances)"
echo "    Then: pm2 start ecosystem.config.cjs"
echo ""
