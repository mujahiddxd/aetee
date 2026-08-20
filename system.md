# ⚙️ System — Aetee's Bakehouse

> System operations, infrastructure, and DevOps documentation.
> Last updated: August 2026

---

## 1. Infrastructure Overview

| Component | Technology | Details |
|---|---|---|
| **Server** | Single VPS | HostEurope, Linux (Debian) |
| **Runtime** | Node.js | Runs Next.js production server |
| **Process Manager** | PM2 | Process name: `aeteesbakehouse`, auto-restart |
| **Database** | MySQL | Managed via Prisma ORM |
| **CDN / WAF** | Cloudflare | DNS, SSL termination, DDoS protection, caching |
| **Bot Protection** | Cloudflare Turnstile | CAPTCHA alternative for forms |
| **Notifications** | Telegram Bot API | Real-time order and contact alerts |
| **Payments** | Razorpay | Indian payment gateway (UPI, cards, wallets) |
| **Version Control** | Git + GitHub | Repository: `mujahiddxd/aetee` |

---

## 2. Environment Variables

All secrets are stored in `.env` at the project root. **Never commit this file.**

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MySQL connection string for Prisma |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay API key ID |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay API key secret |
| `ADMIN_SECRET` | ✅ | Secret used to generate HMAC-SHA256 admin tokens |
| `ADMIN_PASSWORD` | ✅ | Admin login password |
| `TELEGRAM_BOT_TOKEN` | ✅ | Telegram bot API token |
| `TELEGRAM_CHAT_ID` | ✅ | Telegram chat/group ID for notifications |
| `TURNSTILE_SECRET` | ✅ | Cloudflare Turnstile server-side secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ✅ | Cloudflare Turnstile client-side site key |
| `RAZORPAY_WEBHOOK_SECRET` | ⚠️ | Webhook signature verification secret |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | ⚠️ | Google Maps API key (for address autocomplete) |

---

## 3. Database

### Engine & ORM
- **Engine**: MySQL
- **ORM**: Prisma 6.19.x
- **Binary Targets**: `native`, `debian-openssl-1.1.x`, `debian-openssl-3.0.x`, `rhel-openssl-3.0.x`, `linux-musl-openssl-3.0.x`

### Schema Models

| Model | Table | Description |
|---|---|---|
| `User` | `users` | Customer profiles (name, email, phone) |
| `Address` | `addresses` | Customer delivery addresses |
| `Category` | `categories` | Product categories with sort order |
| `Product` | `products` | Menu items with pricing, flags, images |
| `ProductOption` | `product_options` | Size variants (`SIZE:::`) and add-ons (`ADDON:::`) |
| `FilterTag` | `filter_tags` | Product filter/tag labels |
| `Order` | `orders` | Customer orders with Razorpay payment details |
| `OrderItem` | `order_items` | Individual items within an order |
| `RateLimit` | `rate_limits` | DB-backed rate limiting records (contact form) |

### Key Indexes

| Table | Index | Purpose |
|---|---|---|
| `products` | `isFeatured` | Quick lookup for featured products |
| `products` | `isBestSeller` | Quick lookup for best sellers |
| `products` | `isSoldOut` | Quick lookup for sold out status |
| `products` | `sortOrder` | Ordered display |
| `orders` | `status` | Filter by order status |
| `orders` | `createdAt` | Sort by date |
| `orders` | `userId, status, createdAt` | Composite index for user order history |
| `orders` | `deliveryDate, status, createdAt` | Composite index for delivery schedule |
| `rate_limits` | `ip, action` (unique) | Rate limit lookups |

### Database Commands

```bash
# Generate Prisma client (run after schema changes)
npx prisma generate

# Push schema changes to database (dev only, no migration history)
npx prisma db push

# Create a migration (production)
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: destroys all data)
npx prisma migrate reset
```

---

## 4. Build & Deployment

### Build Process

```bash
npm run build
# Equivalent to: prisma generate && next build
```

This will:
1. Generate the Prisma Client from `schema.prisma`
2. Build the Next.js production bundle
3. Pre-render static pages (`/privacy`, `/terms`, `/policy`, `/queue`, `/success`)
4. Compile API routes and server components

### Deployment Steps

```bash
# SSH into the VPS
ssh root@srv1856325

# Navigate to project directory
cd /home/aeteesbakehouse/htdocs/www.aeteesbakehouse.com

# Pull latest changes
git pull origin main

# Install any new dependencies (if package.json changed)
npm install

# Build the application
npm run build

# Restart the process
pm2 restart aeteesbakehouse
```

### PM2 Management

```bash
# Check status
pm2 status

# View logs (live)
pm2 logs aeteesbakehouse

# View last 100 lines of logs
pm2 logs aeteesbakehouse --lines 100

# Restart process
pm2 restart aeteesbakehouse

# Stop process
pm2 stop aeteesbakehouse

# Delete process
pm2 delete aeteesbakehouse

# Start fresh (if process was deleted)
pm2 start npm --name "aeteesbakehouse" -- start

# Save PM2 process list (survives server reboots)
pm2 save

# Setup PM2 startup script (auto-start on boot)
pm2 startup
```

---

## 5. Domains & DNS

| Domain | Points To | Purpose |
|---|---|---|
| `www.aeteesbakehouse.com` | VPS IP (via Cloudflare) | Main storefront |
| `aeteesbakehouse.com` | VPS IP (via Cloudflare) | Main storefront (redirect) |
| `aeteesadmin.*` | Same VPS | Admin panel (subdomain routing via middleware) |

### Cloudflare Configuration
- **SSL**: Full (strict) — Cloudflare ↔ Origin both encrypted
- **Caching**: Standard — static assets cached, API routes bypassed
- **Security Level**: Medium
- **Bot Fight Mode**: Enabled
- **HSTS**: Enabled via `next.config.mjs` headers

---

## 6. Security Configuration

### Content Security Policy (CSP)

Defined in `next.config.mjs`. Key allowed origins:

| Directive | Allowed Origins |
|---|---|
| `script-src` | `'self'`, `'unsafe-inline'`, `'unsafe-eval'`, `checkout.razorpay.com`, `maps.googleapis.com`, `challenges.cloudflare.com` |
| `style-src` | `'self'`, `'unsafe-inline'`, `fonts.googleapis.com` |
| `img-src` | `'self'`, `data:`, `blob:`, `placehold.co`, `*.razorpay.com`, CDN domains, Google Maps |
| `font-src` | `'self'`, `data:`, `fonts.gstatic.com` |
| `connect-src` | `'self'`, Razorpay API/checkout, Google Maps, Cloudflare Turnstile |
| `frame-src` | Razorpay API/checkout, Cloudflare Turnstile |
| `frame-ancestors` | `'none'` (prevents embedding) |

### HTTP Security Headers

| Header | Value |
|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(self)` |

### CORS (API Routes)

| Header | Value |
|---|---|
| `Access-Control-Allow-Origin` | `https://aeteesbakehouse.com` |
| `Access-Control-Allow-Methods` | `GET, DELETE, PATCH, POST, PUT, OPTIONS` |
| `Access-Control-Allow-Credentials` | `true` |

---

## 7. Monitoring & Debugging

### Log Locations

| Source | Access Method |
|---|---|
| Application logs | `pm2 logs aeteesbakehouse` |
| Error logs | `pm2 logs aeteesbakehouse --err` |
| Build output | Terminal during `npm run build` |
| Database queries | Prisma query logging (if enabled in `prisma.js`) |

### Health Checks

```bash
# Check if the process is running
pm2 status

# Check if the site is responding
curl -I https://aeteesbakehouse.com

# Check database connectivity
npx prisma db execute --stdin <<< "SELECT 1;"

# Check disk usage (uploaded images)
du -sh /home/aeteesbakehouse/htdocs/www.aeteesbakehouse.com/uploads/
```

### Common Issues & Fixes

| Issue | Cause | Fix |
|---|---|---|
| 502 Bad Gateway | PM2 process crashed | `pm2 restart aeteesbakehouse` |
| Prisma query errors | Schema out of sync | `npx prisma generate && npm run build` |
| Images not loading | Upload directory missing | `mkdir -p uploads/` |
| Admin login fails | Wrong ADMIN_SECRET/ADMIN_PASSWORD | Check `.env` variables |
| Turnstile failures | Wrong TURNSTILE_SECRET | Verify Cloudflare dashboard matches `.env` |
| Double scrollbars | CSS overflow conflict | Fixed — `overflow-x: hidden` on `body` only |
| Old data showing | Cache not invalidated | Restart PM2 to clear in-memory cache |

---

## 8. In-Memory Services

These services run in the Node.js process memory. They are **lost on restart** but are designed to be ephemeral.

### 8.1 Cache (`src/lib/cache.js`)
- **Storage**: `globalThis.__aetee_cache__` (Map)
- **Survives HMR**: Yes (via globalThis)
- **Survives PM2 restart**: No — cache rebuilds on first request
- **Keys**: `products` (60s TTL), `categories` (3600s TTL)

### 8.2 Rate Limiter (`src/lib/rateLimitMemory.js`)
- **Storage**: `globalThis.__aetee_rate_limits__` (Map)
- **Cleanup**: Every 5 minutes, expired entries are purged
- **Survives PM2 restart**: No — all limits reset

### 8.3 Queue Engine (`src/lib/queue.js`)
- **Storage**: `QueueEngine` singleton via `globalThis`
- **Capacity**: 100 concurrent users, 10-minute token TTL
- **Background loops**:
  - Cleanup (expired tokens): every 15 seconds
  - Admit next in queue: every 2 seconds
- **Survives PM2 restart**: No — all queued users must rejoin

---

## 9. Backup Strategy

### Database Backup

```bash
# Manual MySQL dump
mysqldump -u <user> -p <database_name> > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u <user> -p <database_name> < backup_20260820.sql
```

### Code Backup
- All code is version-controlled in Git (GitHub: `mujahiddxd/aetee`)
- `.env` file is NOT committed — keep a secure copy separately

### Upload Backup
- Product images in the `uploads/` directory are NOT version-controlled
- Consider periodic backup to external storage

---

## 10. Performance Considerations

| Area | Optimization |
|---|---|
| **Images** | Sharp converts to WebP, max 1200px width, quality 80 |
| **Database** | Composite indexes on frequently queried columns |
| **Caching** | In-memory TTL cache avoids redundant DB queries |
| **ISR** | Next.js Incremental Static Regeneration (60s) for product/category pages |
| **Fonts** | Google Fonts loaded via `next/font` (auto-optimized, no FOUT) |
| **Bundle** | Next.js automatic code splitting per route |
| **CDN** | Cloudflare caches static assets at the edge |

---

## 11. Useful Scripts (Project Root)

| Script | Purpose |
|---|---|
| `check-count.js` | Check product count in database |
| `debug-count.js` | Debug product data with detailed output |
| `delete-seed.js` | Delete seeded test data |
| `seed-orders.js` | Seed sample orders for testing |
| `load-test.js` | k6 load testing script |
| `generate-og.mjs` | Generate Open Graph image |
| `test.js` | General test script |
