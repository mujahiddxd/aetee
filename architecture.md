# 🏗️ Architecture — Aetee's Bakehouse

> Technical architecture documentation for the Aetee's Bakehouse e-commerce platform.
> Last updated: August 2026

---

## 1. Overview

Aetee's Bakehouse is a **full-stack e-commerce web application** built for a premium artisan bakery. It enables customers to browse products, customize orders (sizes, add-ons, egg preferences), pay online via Razorpay, and receive Telegram notifications for order updates.

### Tech Stack Summary

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.11 |
| **Frontend** | React | 19.2.4 |
| **Styling** | Vanilla CSS (globals.css) | — |
| **Database** | MySQL | — |
| **ORM** | Prisma Client | 6.19.x |
| **Payments** | Razorpay | 2.9.x |
| **Image Processing** | Sharp | 0.35.x |
| **Maps** | Leaflet + React-Leaflet | 1.9.x / 5.0.x |
| **Image Cropping** | react-easy-crop | 6.2.x |
| **Bot Protection** | Cloudflare Turnstile | — |
| **Notifications** | Telegram Bot API | — |
| **Process Manager** | PM2 | — |
| **Hosting** | Single VPS (HostEurope) | — |
| **Analytics** | Vercel Analytics | 2.0.x |

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │   Home   │  │   Menu   │  │   Cart   │  │    Checkout    │  │
│  │  (page)  │  │  (page)  │  │  (page)  │  │    (page)      │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Context: CartProvider (localStorage)           ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │        Shared: Navbar · Footer · PageTransition             ││
│  │        Components: ProductCard · ProductModal · AddressModal││
│  │        Guards: QueueGuard · WhatsAppButton                  ││
│  └─────────────────────────────────────────────────────────────┘│
└────────────────────────┬─────────────────────────────────────────┘
                         │ HTTP (API Routes)
┌────────────────────────▼─────────────────────────────────────────┐
│                      SERVER (Next.js Node.js)                    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Middleware (Edge Runtime)                 ││
│  │         Admin auth · Subdomain routing · API protection     ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌──────────────────── API Routes ─────────────────────────────┐│
│  │  /api/products   /api/categories   /api/filters             ││
│  │  /api/orders     /api/checkout     /api/payment/verify      ││
│  │  /api/contact    /api/upload       /api/delivery-dates      ││
│  │  /api/queue/*    /api/admin/*      /api/webhooks/razorpay   ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                  │
│  ┌──────────────────── Libraries ──────────────────────────────┐│
│  │  prisma.js  · cache.js   · auth.js      · telegram.js      ││
│  │  queue.js   · sanitize.js · turnstile.js · rateLimitMemory  ││
│  │  ist-time.js · queue-state.js · cropImage.js                ││
│  └─────────────────────────────────────────────────────────────┘│
└────────────────────────┬─────────────────────────────────────────┘
                         │
          ┌──────────────▼──────────────┐
          │         MySQL Database      │
          │   (Prisma ORM - 8 Models)   │
          │  User · Address · Category  │
          │  Product · ProductOption     │
          │  Order · OrderItem           │
          │  FilterTag · RateLimit       │
          └─────────────────────────────┘
```

---

## 3. Directory Structure

```
aetee/
├── prisma/
│   └── schema.prisma           # Database schema (8 models)
├── public/                     # Static assets (images, logos, slides)
├── src/
│   ├── middleware.js            # Edge middleware (auth, subdomain routing)
│   ├── lib/                    # Shared server utilities
│   │   ├── auth.js             # HMAC-SHA256 admin token generation
│   │   ├── cache.js            # In-memory cache with TTL
│   │   ├── cropImage.js        # Client-side image cropping utility
│   │   ├── ist-time.js         # IST timezone helpers
│   │   ├── prisma.js           # Prisma client singleton
│   │   ├── queue.js            # Virtual queue engine (in-memory)
│   │   ├── queue-state.js      # Queue token state management
│   │   ├── rateLimitMemory.js  # In-memory rate limiter
│   │   ├── sanitize.js         # HTML stripping utilities
│   │   ├── telegram.js         # Telegram bot notification helpers
│   │   └── turnstile.js        # Cloudflare Turnstile verification
│   └── app/                    # Next.js App Router
│       ├── layout.js           # Root layout (fonts, providers, navbar, footer)
│       ├── page.js             # Home page (hero slider, featured products)
│       ├── globals.css         # Global stylesheet (~1400 lines)
│       ├── Navbar.js           # Desktop + Mobile navigation
│       ├── Footer.js           # Site footer with newsletter signup
│       ├── context/
│       │   └── CartContext.js   # Cart state (React Context + localStorage)
│       ├── components/
│       │   ├── AddressModal.js  # Address entry + delivery/pickup toggle
│       │   ├── DateStrip.js     # Horizontal scrollable date picker
│       │   ├── Icons.js         # SVG icon components
│       │   ├── ImageCropperModal.js  # Image crop modal (admin)
│       │   ├── PageTransition.js     # Full-screen loading transitions
│       │   ├── ProductCard.js        # Menu product card
│       │   ├── ProductModal.js       # Product detail + add-to-cart modal
│       │   ├── QueueGuard.js         # Virtual queue client guard
│       │   ├── RepeatComboModal.js   # Repeat/customize modal for cart
│       │   └── WhatsAppButton.js     # Floating WhatsApp CTA
│       ├── menu/               # Menu browsing page
│       ├── cart/                # Shopping cart page
│       ├── checkout/            # Checkout flow page
│       ├── success/             # Order confirmation page
│       ├── contact/             # Contact form page
│       ├── queue/               # Virtual queue waiting room
│       ├── terms/               # Terms & conditions (static)
│       ├── privacy/             # Privacy policy (static)
│       ├── policy/              # Purchaser policy (static)
│       ├── admin/               # Admin panel
│       │   ├── layout.js        # Admin layout (sidebar nav)
│       │   ├── admin.css        # Admin-specific styles
│       │   ├── login/           # Admin login page
│       │   ├── dashboard/       # Dashboard with analytics
│       │   ├── products/        # Product CRUD management
│       │   ├── categories/      # Category management
│       │   └── filters/         # Filter tag management
│       └── api/                 # API routes (see api-contract.md)
├── next.config.mjs             # Next.js config (CSP, rewrites, headers)
├── package.json
└── .env                        # Environment variables
```

---

## 4. Data Flow

### 4.1 Customer Order Flow

```
┌─────────┐    ┌─────────┐    ┌──────────┐    ┌──────────────┐    ┌────────────┐
│  Browse  │───▶│  Add to │───▶│ Checkout │───▶│  Razorpay    │───▶│  Success   │
│  Menu    │    │  Cart   │    │  Form    │    │  Payment     │    │  Page      │
└─────────┘    └─────────┘    └──────────┘    └──────────────┘    └────────────┘
     │              │              │                │                    │
     ▼              ▼              ▼                ▼                    ▼
 GET /api/     localStorage    POST /api/      POST /api/         Telegram
 products      (CartContext)   checkout         payment/verify     Notification
                               (creates         (verifies sig,     to Owner
                               Razorpay order)   updates status)
```

### 4.2 Admin Flow

```
┌─────────┐    ┌──────────────┐    ┌─────────────────┐
│  Login  │───▶│  Dashboard   │───▶│  CRUD Products  │
│  Form   │    │  (stats)     │    │  Categories     │
└─────────┘    └──────────────┘    │  Filters        │
     │                             │  Order Status   │
     ▼                             └─────────────────┘
 POST /api/         GET /api/           POST/PUT/DELETE
 admin/login        admin/dashboard     /api/products, etc.
 (sets cookie)      (aggregated         (middleware auth)
                    analytics)
```

---

## 5. Authentication & Authorization

### Admin Authentication
- **Mechanism**: HMAC-SHA256 signed cookie (`admin_token`)
- **Flow**: Admin submits password → server compares with `ADMIN_SECRET` env var → generates HMAC token → sets HttpOnly cookie
- **Verification**: Both the middleware (Edge Runtime using Web Crypto API) and the Node.js runtime (using `crypto` module) compute the same HMAC to verify the token
- **Protected Resources**:
  - Admin UI pages (`/admin/*`, except `/admin/login`)
  - Modifying API requests (`POST/PUT/PATCH/DELETE`) to `/api/products`, `/api/categories`, `/api/filters`
  - All requests to `/api/orders` (except the `/cancel` sub-route)
  - File uploads (`/api/upload`)

### Subdomain Routing
- `aeteesadmin.*` subdomain rewrites root to `/admin` via middleware
- Direct `/admin` access on the main domain is blocked (redirected to `/`) in production; allowed on localhost for development

---

## 6. Caching Strategy

### In-Memory Cache (`src/lib/cache.js`)
- **Implementation**: `Map` stored on `globalThis` (survives HMR in dev)
- **TTL-based**: Each entry expires after a configurable duration
- **Usage**:
  - Products: 60-second TTL
  - Categories: 3600-second (1 hour) TTL
- **Invalidation**: Explicit `invalidateCache(key)` calls after any create/update/delete operation
- **Next.js ISR**: `revalidate = 60` on product/category routes for edge-level revalidation

### Client-Side Cart
- Cart state managed via React Context (`CartContext.js`)
- Persisted to `localStorage` under key `aetee_cart`
- Unique cart item IDs generated from `productId + size + addons + eggPreference`

---

## 7. Security Measures

| Layer | Measure | Implementation |
|---|---|---|
| **Transport** | HSTS | `max-age=63072000; includeSubDomains; preload` |
| **Clickjacking** | X-Frame-Options | `SAMEORIGIN` |
| **MIME Sniffing** | X-Content-Type-Options | `nosniff` |
| **CSP** | Content-Security-Policy | Strict policy with Razorpay, Google Maps, Cloudflare allowlist |
| **Bot Protection** | Cloudflare Turnstile | Server-side siteverify on checkout and contact forms |
| **Rate Limiting** | In-memory rate limiter | Per-IP sliding window (e.g., 15 req/min for checkout) |
| **Rate Limiting** | DB-backed rate limiter | Per-IP for contact form (3 req/hour, persistent) |
| **Input Sanitization** | HTML stripping | `stripHtml()` utility for user-submitted text |
| **Payment Integrity** | Razorpay signature | HMAC-SHA256 verification with timing-safe comparison |
| **Auth Tokens** | HMAC-SHA256 | Signed admin cookies verified in Edge middleware |
| **CORS** | API headers | Origin restricted to `https://aeteesbakehouse.com` |

---

## 8. Virtual Queue System

An in-memory virtual waiting room for handling high-traffic events (flash sales, product launches).

### Architecture
- **Engine**: `QueueEngine` class singleton (stored on `globalThis`)
- **No Redis Required**: Runs entirely in-process — designed for single-VPS deployment
- **Components**:
  - `activeTokens` Map — admitted users with expiry timestamps
  - `waitingQueue` Array — FIFO queue of waiting sessions
  - `sessionIndex` Map — fast lookup: sessionId → token or null

### Configuration
- Max concurrent users: **100**
- Token TTL: **10 minutes**
- Admission interval: **2 seconds**
- Cleanup interval: **15 seconds**

### Client Integration
- `QueueGuard` component in root layout polls `/api/queue/validate` on every navigation
- If the queue is enabled and the user lacks a valid token, they are redirected to `/queue` (waiting room page)
- Queue enforcement is client-side (Edge middleware cannot access Node.js in-memory state)

---

## 9. Notification System

### Telegram Bot
- **Library**: Custom `telegram.js` utility wrapping the Telegram Bot API
- **Features**:
  - HTML-safe message formatting (`escapeHtml`)
  - Automatic retry on transient failures (2 retries)
  - Rich order notification templates with itemized details
- **Triggers**:
  - New order placed (after successful Razorpay verification)
  - Contact form submissions
- **Configuration**: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` env vars

---

## 10. Image Pipeline

### Upload Flow
1. Admin uploads image via `/api/upload` (multipart form-data)
2. Server validates: admin auth, file type (image/*), file size (≤10MB)
3. **Sharp** processes the image: resize to max 1200px width, convert to WebP, quality 80
4. Saved to disk with a random hash filename
5. Served via `/uploads/:filename` rewrite rule (→ `/api/uploads/:filename`)

### Client-Side Cropping
- `react-easy-crop` provides an interactive crop UI in the admin panel
- `cropImage.js` utility generates the cropped blob client-side before upload

---

## 11. Deployment Architecture

```
┌───────────────────────────────────────────┐
│            Single VPS (HostEurope)        │
│                                           │
│  ┌───────────────────────────────────┐   │
│  │       PM2 Process Manager         │   │
│  │   ┌─────────────────────────┐     │   │
│  │   │  next start (port 3000) │     │   │
│  │   │  (aeteesbakehouse)      │     │   │
│  │   └─────────────────────────┘     │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌───────────────────────────────────┐   │
│  │         MySQL Database            │   │
│  └───────────────────────────────────┘   │
│                                           │
│  ┌───────────────────────────────────┐   │
│  │   /uploads/ (disk-based images)   │   │
│  └───────────────────────────────────┘   │
└───────────────────────────────────────────┘
           │
           │  Reverse Proxy
           ▼
┌─────────────────────────────┐
│   Cloudflare (CDN + WAF)    │
│   aeteesbakehouse.com       │
│   aeteesadmin.*             │
└─────────────────────────────┘
```

### Deployment Commands
```bash
git pull origin main
npm run build          # prisma generate && next build
pm2 restart aeteesbakehouse
```
