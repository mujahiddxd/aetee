#!/usr/bin/env bash
# ╔════════════════════════════════════════════════════════════════════╗
# ║     Aetees Bakehouse — Razorpay & PM2 Diagnostic Script          ║
# ╠════════════════════════════════════════════════════════════════════╣
# ║  Run on VPS:  bash check-razorpay.sh                             ║
# ║  Or:          bash check-razorpay.sh /path/to/.env               ║
# ╚════════════════════════════════════════════════════════════════════╝

set -uo pipefail

# ── Colors ───────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

pass()  { echo -e "  ${GREEN}✔${NC} $1"; }
fail()  { echo -e "  ${RED}✘${NC} $1"; ERRORS=$((ERRORS + 1)); }
warn()  { echo -e "  ${YELLOW}⚠${NC} $1"; }
info()  { echo -e "  ${CYAN}ℹ${NC} $1"; }
header(){ echo -e "\n${BOLD}━━━ $1 ━━━${NC}"; }

ERRORS=0

# ── Locate .env ──────────────────────────────────
ENV_FILE="${1:-}"
if [ -z "$ENV_FILE" ]; then
  # Try common locations
  for candidate in "/root/aetee/.env" "/home/aetee/.env" "/var/www/aetee/.env" "$(pwd)/.env"; do
    if [ -f "$candidate" ]; then
      ENV_FILE="$candidate"
      break
    fi
  done
fi

if [ -z "$ENV_FILE" ] || [ ! -f "$ENV_FILE" ]; then
  echo -e "${RED}ERROR: Could not find .env file.${NC}"
  echo "Usage: bash check-razorpay.sh /path/to/your/.env"
  exit 1
fi

echo -e "${BOLD}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   Aetees — Razorpay & PM2 Health Check        ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════╝${NC}"
echo ""
info "Using .env file: ${ENV_FILE}"
info "Timestamp: $(date '+%Y-%m-%d %H:%M:%S %Z')"

# ── Parse .env (handles quotes) ──────────────────
get_env() {
  local key="$1"
  local val
  val=$(grep -E "^${key}=" "$ENV_FILE" | head -1 | sed 's/^[^=]*=//' | sed 's/^["'\'']//' | sed 's/["'\'']*$//' | xargs)
  echo "$val"
}

# ═══════════════════════════════════════════════════
# SECTION 1: ENVIRONMENT VARIABLES
# ═══════════════════════════════════════════════════
header "1. RAZORPAY ENVIRONMENT VARIABLES"

RAZORPAY_KEY_ID=$(get_env "RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET=$(get_env "RAZORPAY_KEY_SECRET")
NEXT_PUBLIC_RAZORPAY_KEY_ID=$(get_env "NEXT_PUBLIC_RAZORPAY_KEY_ID")

# Check RAZORPAY_KEY_ID
if [ -z "$RAZORPAY_KEY_ID" ]; then
  fail "RAZORPAY_KEY_ID is NOT SET in .env"
else
  # Mask the key for display
  MASKED_KEY="${RAZORPAY_KEY_ID:0:10}...${RAZORPAY_KEY_ID: -4}"
  if [[ "$RAZORPAY_KEY_ID" == rzp_test_* ]]; then
    pass "RAZORPAY_KEY_ID is set (TEST mode): ${MASKED_KEY}"
  elif [[ "$RAZORPAY_KEY_ID" == rzp_live_* ]]; then
    pass "RAZORPAY_KEY_ID is set (LIVE mode): ${MASKED_KEY}"
  else
    fail "RAZORPAY_KEY_ID has unexpected format: ${MASKED_KEY}"
  fi
fi

# Check RAZORPAY_KEY_SECRET
if [ -z "$RAZORPAY_KEY_SECRET" ]; then
  fail "RAZORPAY_KEY_SECRET is NOT SET in .env"
else
  MASKED_SECRET="${RAZORPAY_KEY_SECRET:0:6}...${RAZORPAY_KEY_SECRET: -4}"
  pass "RAZORPAY_KEY_SECRET is set: ${MASKED_SECRET}"
fi

# Check NEXT_PUBLIC_RAZORPAY_KEY_ID (frontend key)
if [ -z "$NEXT_PUBLIC_RAZORPAY_KEY_ID" ]; then
  warn "NEXT_PUBLIC_RAZORPAY_KEY_ID is NOT SET (frontend may use RAZORPAY_KEY_ID directly)"
else
  MASKED_PUBLIC="${NEXT_PUBLIC_RAZORPAY_KEY_ID:0:10}...${NEXT_PUBLIC_RAZORPAY_KEY_ID: -4}"
  if [[ "$NEXT_PUBLIC_RAZORPAY_KEY_ID" == rzp_test_* ]]; then
    pass "NEXT_PUBLIC_RAZORPAY_KEY_ID is set (TEST mode): ${MASKED_PUBLIC}"
  elif [[ "$NEXT_PUBLIC_RAZORPAY_KEY_ID" == rzp_live_* ]]; then
    pass "NEXT_PUBLIC_RAZORPAY_KEY_ID is set (LIVE mode): ${MASKED_PUBLIC}"
  else
    fail "NEXT_PUBLIC_RAZORPAY_KEY_ID has unexpected format: ${MASKED_PUBLIC}"
  fi
fi

# ═══════════════════════════════════════════════════
# SECTION 2: KEY CONSISTENCY
# ═══════════════════════════════════════════════════
header "2. KEY CONSISTENCY CHECK"

# Frontend vs Backend key match
if [ -n "$NEXT_PUBLIC_RAZORPAY_KEY_ID" ] && [ -n "$RAZORPAY_KEY_ID" ]; then
  if [ "$NEXT_PUBLIC_RAZORPAY_KEY_ID" = "$RAZORPAY_KEY_ID" ]; then
    pass "Frontend and backend keys MATCH"
  else
    fail "Frontend and backend keys DO NOT MATCH!"
    echo -e "    ${RED}Backend:  $RAZORPAY_KEY_ID${NC}"
    echo -e "    ${RED}Frontend: $NEXT_PUBLIC_RAZORPAY_KEY_ID${NC}"
    echo -e "    ${YELLOW}→ Both must be the same key. Payment will fail otherwise!${NC}"
  fi
fi

# Mode consistency (test vs live)
if [ -n "$RAZORPAY_KEY_ID" ] && [ -n "$RAZORPAY_KEY_SECRET" ]; then
  KEY_IS_TEST=false
  [[ "$RAZORPAY_KEY_ID" == rzp_test_* ]] && KEY_IS_TEST=true

  if $KEY_IS_TEST; then
    info "Mode: TEST — use test cards for payments"
    info "Test card: 4111 1111 1111 1111 (any expiry, any CVV)"
  else
    info "Mode: LIVE — real payments will be charged"
  fi
fi

# ═══════════════════════════════════════════════════
# SECTION 3: RAZORPAY API AUTH TEST
# ═══════════════════════════════════════════════════
header "3. RAZORPAY API AUTHENTICATION TEST"

if [ -n "$RAZORPAY_KEY_ID" ] && [ -n "$RAZORPAY_KEY_SECRET" ]; then
  info "Calling Razorpay API to verify credentials..."

  HTTP_RESPONSE=$(curl -s -w "\n%{http_code}" \
    -u "${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}" \
    "https://api.razorpay.com/v1/payments?count=1" 2>&1)

  HTTP_CODE=$(echo "$HTTP_RESPONSE" | tail -1)
  HTTP_BODY=$(echo "$HTTP_RESPONSE" | sed '$d')

  case "$HTTP_CODE" in
    200)
      pass "Razorpay API auth SUCCESS (HTTP 200)"
      PAYMENT_COUNT=$(echo "$HTTP_BODY" | grep -o '"count":[0-9]*' | head -1 | cut -d: -f2)
      if [ -n "$PAYMENT_COUNT" ]; then
        info "Total payments in account: ${PAYMENT_COUNT}"
      fi
      ;;
    401)
      fail "Razorpay API auth FAILED (HTTP 401 Unauthorized)"
      echo -e "    ${RED}→ Key ID and Secret don't match, or the key pair is invalid${NC}"
      echo -e "    ${YELLOW}→ Go to Razorpay Dashboard → Settings → API Keys → Generate new test keys${NC}"
      ;;
    403)
      fail "Razorpay API FORBIDDEN (HTTP 403)"
      echo -e "    ${RED}→ Account may be suspended or keys revoked${NC}"
      ;;
    *)
      warn "Razorpay API returned HTTP ${HTTP_CODE}"
      echo -e "    Response: ${HTTP_BODY:0:200}"
      ;;
  esac
else
  fail "Cannot test API — credentials are missing"
fi

# ═══════════════════════════════════════════════════
# SECTION 4: TEST ORDER CREATION
# ═══════════════════════════════════════════════════
header "4. RAZORPAY TEST ORDER CREATION"

if [ -n "$RAZORPAY_KEY_ID" ] && [ -n "$RAZORPAY_KEY_SECRET" ]; then
  info "Creating a test order for ₹1 (100 paise)..."

  ORDER_RESPONSE=$(curl -s -X POST \
    -u "${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}" \
    -H "Content-Type: application/json" \
    -d '{"amount":100,"currency":"INR","receipt":"diag_test_'$(date +%s)'"}' \
    "https://api.razorpay.com/v1/orders" 2>&1)

  ORDER_ID=$(echo "$ORDER_RESPONSE" | grep -o '"id":"order_[^"]*"' | head -1 | cut -d'"' -f4)

  if [ -n "$ORDER_ID" ]; then
    pass "Test order created successfully: ${ORDER_ID}"
    ORDER_STATUS=$(echo "$ORDER_RESPONSE" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    info "Order status: ${ORDER_STATUS}"
  else
    fail "Failed to create test order"
    ERROR_DESC=$(echo "$ORDER_RESPONSE" | grep -o '"description":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ -n "$ERROR_DESC" ]; then
      echo -e "    ${RED}Error: ${ERROR_DESC}${NC}"
    else
      echo -e "    ${RED}Response: ${ORDER_RESPONSE:0:300}${NC}"
    fi
  fi
else
  fail "Cannot create test order — credentials are missing"
fi

# ═══════════════════════════════════════════════════
# SECTION 5: PM2 CLUSTER STATUS
# ═══════════════════════════════════════════════════
header "5. PM2 CLUSTER STATUS"

if command -v pm2 &>/dev/null; then
  pass "PM2 is installed: $(pm2 --version 2>/dev/null || echo 'unknown version')"

  # Get PM2 process list
  PM2_LIST=$(pm2 jlist 2>/dev/null)

  if [ -n "$PM2_LIST" ] && [ "$PM2_LIST" != "[]" ]; then
    PROCESS_COUNT=$(echo "$PM2_LIST" | grep -o '"pm_id"' | wc -l)
    ONLINE_COUNT=$(echo "$PM2_LIST" | grep -o '"online"' | wc -l)
    ERRORED_COUNT=$(echo "$PM2_LIST" | grep -o '"errored"' | wc -l)
    STOPPED_COUNT=$(echo "$PM2_LIST" | grep -o '"stopped"' | wc -l)

    pass "PM2 processes found: ${PROCESS_COUNT}"
    info "Online: ${ONLINE_COUNT} | Errored: ${ERRORED_COUNT} | Stopped: ${STOPPED_COUNT}"

    if [ "$ERRORED_COUNT" -gt 0 ]; then
      fail "${ERRORED_COUNT} PM2 process(es) are in ERRORED state!"
      echo -e "    ${YELLOW}→ Run: pm2 logs --err --lines 30${NC}"
    fi

    # Check exec mode (cluster vs fork)
    CLUSTER_COUNT=$(echo "$PM2_LIST" | grep -o '"exec_mode":"cluster_mode"' | wc -l)
    FORK_COUNT=$(echo "$PM2_LIST" | grep -o '"exec_mode":"fork_mode"' | wc -l)

    if [ "$CLUSTER_COUNT" -gt 0 ]; then
      pass "Cluster mode: ${CLUSTER_COUNT} worker(s)"
    fi
    if [ "$FORK_COUNT" -gt 0 ]; then
      info "Fork mode: ${FORK_COUNT} process(es)"
    fi

    # Show restart counts
    echo ""
    info "Process details:"
    pm2 list 2>/dev/null | head -20

    # Check for high restart counts (sign of crashes)
    TOTAL_RESTARTS=$(echo "$PM2_LIST" | grep -oP '"restart_time":\K[0-9]+' | awk '{sum+=$1} END {print sum+0}')
    if [ "$TOTAL_RESTARTS" -gt 10 ]; then
      warn "High total restart count: ${TOTAL_RESTARTS} — processes may be crashing"
      echo -e "    ${YELLOW}→ Run: pm2 logs --err --lines 50${NC}"
    elif [ "$TOTAL_RESTARTS" -gt 0 ]; then
      info "Total restart count: ${TOTAL_RESTARTS}"
    fi
  else
    fail "No PM2 processes running!"
    echo -e "    ${YELLOW}→ Start with: pm2 start ecosystem.config.js${NC}"
  fi
else
  fail "PM2 is NOT installed"
  echo -e "    ${YELLOW}→ Install: npm install -g pm2${NC}"
fi

# ═══════════════════════════════════════════════════
# SECTION 6: NEXT.JS BUILD CHECK
# ═══════════════════════════════════════════════════
header "6. NEXT.JS BUILD CHECK"

APP_DIR=$(dirname "$ENV_FILE")
if [ -d "${APP_DIR}/.next" ]; then
  BUILD_ID_FILE="${APP_DIR}/.next/BUILD_ID"
  if [ -f "$BUILD_ID_FILE" ]; then
    BUILD_ID=$(cat "$BUILD_ID_FILE")
    BUILD_TIME=$(stat -c '%Y' "$BUILD_ID_FILE" 2>/dev/null || stat -f '%m' "$BUILD_ID_FILE" 2>/dev/null)
    BUILD_DATE=$(date -d "@${BUILD_TIME}" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || date -r "${BUILD_TIME}" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || echo "unknown")
    pass "Next.js build found (ID: ${BUILD_ID:0:8}...)"
    info "Last build time: ${BUILD_DATE}"

    # Check if .env is newer than the build
    ENV_TIME=$(stat -c '%Y' "$ENV_FILE" 2>/dev/null || stat -f '%m' "$ENV_FILE" 2>/dev/null)
    if [ -n "$BUILD_TIME" ] && [ -n "$ENV_TIME" ] && [ "$ENV_TIME" -gt "$BUILD_TIME" ]; then
      fail ".env was modified AFTER the last build!"
      echo -e "    ${RED}→ NEXT_PUBLIC_* vars are baked into the build at compile time${NC}"
      echo -e "    ${RED}→ You MUST rebuild: npm run build && pm2 restart all${NC}"
    else
      pass ".env is older than the build (no rebuild needed)"
    fi
  else
    warn "Build exists but BUILD_ID file missing"
  fi
else
  warn "No .next build directory found at ${APP_DIR}/.next"
fi

# ═══════════════════════════════════════════════════
# SECTION 7: PORT & CONNECTIVITY CHECK
# ═══════════════════════════════════════════════════
header "7. PORT & CONNECTIVITY"

if command -v ss &>/dev/null; then
  PORT_3000=$(ss -tlnp 2>/dev/null | grep ':3000')
  if [ -n "$PORT_3000" ]; then
    pass "Port 3000 is listening"
  else
    fail "Nothing is listening on port 3000!"
  fi
elif command -v netstat &>/dev/null; then
  PORT_3000=$(netstat -tlnp 2>/dev/null | grep ':3000')
  if [ -n "$PORT_3000" ]; then
    pass "Port 3000 is listening"
  else
    fail "Nothing is listening on port 3000!"
  fi
else
  warn "Cannot check ports (ss/netstat not available)"
fi

# Quick localhost test
LOCALHOST_CHECK=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "http://localhost:3000/" 2>/dev/null)
if [ "$LOCALHOST_CHECK" = "200" ]; then
  pass "localhost:3000 responding (HTTP ${LOCALHOST_CHECK})"
elif [ -n "$LOCALHOST_CHECK" ] && [ "$LOCALHOST_CHECK" != "000" ]; then
  warn "localhost:3000 returned HTTP ${LOCALHOST_CHECK}"
else
  fail "localhost:3000 is NOT responding"
fi

# ═══════════════════════════════════════════════════
# SECTION 8: RECENT ERROR LOGS
# ═══════════════════════════════════════════════════
header "8. RECENT ERROR LOGS (last 20 lines)"

if command -v pm2 &>/dev/null; then
  PM2_ERR_LOG=$(pm2 show 0 2>/dev/null | grep "err log path" | awk '{print $NF}')
  if [ -n "$PM2_ERR_LOG" ] && [ -f "$PM2_ERR_LOG" ]; then
    RECENT_ERRORS=$(tail -20 "$PM2_ERR_LOG" 2>/dev/null)
    if [ -n "$RECENT_ERRORS" ]; then
      warn "Recent errors found:"
      echo -e "${RED}"
      echo "$RECENT_ERRORS"
      echo -e "${NC}"
    else
      pass "No recent errors in PM2 error log"
    fi
  else
    info "Could not locate PM2 error log"
  fi
  
  # Also grep for razorpay-specific errors
  PM2_OUT_LOG=$(pm2 show 0 2>/dev/null | grep "out log path" | awk '{print $NF}')
  if [ -n "$PM2_OUT_LOG" ] && [ -f "$PM2_OUT_LOG" ]; then
    RZP_ERRORS=$(grep -i "razorpay\|payment.*fail\|401\|gateway" "$PM2_OUT_LOG" 2>/dev/null | tail -10)
    if [ -n "$RZP_ERRORS" ]; then
      warn "Razorpay-related log entries:"
      echo -e "${YELLOW}"
      echo "$RZP_ERRORS"
      echo -e "${NC}"
    else
      pass "No Razorpay errors found in output log"
    fi
  fi
fi

# ═══════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════
header "SUMMARY"

if [ "$ERRORS" -eq 0 ]; then
  echo -e "\n  ${GREEN}${BOLD}All checks passed! ✔${NC}"
  echo -e "  Everything looks good. If payments still fail, check:"
  echo -e "  1. Browser console for frontend JS errors"
  echo -e "  2. Razorpay Dashboard for payment attempt logs"
else
  echo -e "\n  ${RED}${BOLD}${ERRORS} issue(s) found ✘${NC}"
  echo -e "\n  ${BOLD}Quick fixes:${NC}"
  echo -e "  1. Verify keys at: ${CYAN}https://dashboard.razorpay.com/app/keys${NC}"
  echo -e "  2. Rebuild & restart:"
  echo -e "     ${CYAN}cd $(dirname "$ENV_FILE") && npm run build && pm2 restart all${NC}"
  echo -e "  3. Check logs: ${CYAN}pm2 logs --err --lines 50${NC}"
fi

echo ""
