# 📡 API Contract — Aetee's Bakehouse

> API reference documentation for the Aetee's Bakehouse e-commerce platform.
> Base URL: `https://aeteesbakehouse.com/api`
> Last updated: August 2026

---

## Authentication

All admin-modifying endpoints require a valid `admin_token` cookie (HMAC-SHA256 signed).
Public-facing forms (checkout, contact) require a Cloudflare Turnstile token in the request body.

| Header/Cookie | Required By | Description |
|---|---|---|
| `Cookie: admin_token=<token>` | Admin APIs (POST/PUT/DELETE) | HMAC-SHA256 admin session token |
| Body: `cf-turnstile-response` | Checkout, Contact | Cloudflare Turnstile verification token |

---

## Rate Limits

| Endpoint | Limit | Window | Type |
|---|---|---|---|
| `POST /api/checkout` | 15 requests | 60 seconds | In-memory (per IP) |
| `POST /api/payment/verify` | 20 requests | 60 seconds | In-memory (per IP) |
| `GET /api/categories` | 120 requests | 60 seconds | In-memory (per IP) |
| `POST /api/contact` | 3 requests | 1 hour | DB-backed (persistent) |

---

## Standard Error Response

All error responses follow this format:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

Or for simpler routes:

```json
{
  "error": "Human-readable error message"
}
```

HTTP status codes: `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `409` (Conflict), `429` (Rate Limited), `500` (Server Error)

---

## 1. Products

### `GET /api/products`

Fetch all products with categories, options (sizes/addons), and filter tags.

**Auth**: Public (no auth required)
**Cache**: In-memory TTL 60s + ISR revalidate 60s

**Response** `200 OK`:
```json
[
  {
    "id": "uuid",
    "name": "Chocolate Truffle Cake",
    "description": "Rich chocolate cake with truffle frosting",
    "price": 850.00,
    "categoryId": "uuid",
    "category": "Cakes",
    "image": "https://...image-url.webp",
    "isFeatured": true,
    "isBestSelling": false,
    "isSoldOut": false,
    "hasEggless": true,
    "hasEgg": false,
    "addons": [
      { "id": "uuid", "name": "Extra Frosting", "price": 150.00, "image": null }
    ],
    "sizes": [
      { "id": "uuid", "name": "500g", "price": 0.00, "image": null },
      { "id": "uuid", "name": "1kg", "price": 400.00, "image": null }
    ],
    "filters": ["uuid-1", "uuid-2"],
    "filterTags": [
      { "id": "uuid-1", "name": "Chocolate" },
      { "id": "uuid-2", "name": "Premium" }
    ]
  }
]
```

---

### `POST /api/products`

Create a new product with options.

**Auth**: Admin required (cookie)

**Request Body**:
```json
{
  "name": "New Cake",
  "description": "Description here",
  "price": 500,
  "categoryId": "uuid",
  "imageUrl": "/uploads/abc123.webp",
  "isFeatured": false,
  "isBestSeller": false,
  "isSoldOut": false,
  "hasEggless": true,
  "hasEgg": false,
  "options": [
    { "name": "SIZE:::500g", "extraPrice": 0 },
    { "name": "SIZE:::1kg", "extraPrice": 400 },
    { "name": "ADDON:::Extra Frosting", "extraPrice": 150 }
  ],
  "filters": ["uuid-1", "uuid-2"]
}
```

**Response** `201 Created`:
```json
{
  "id": "uuid",
  "name": "New Cake",
  "...": "..."
}
```

---

### `GET /api/products/[id]`

Fetch a single product by ID.

**Auth**: Public

**Response** `200 OK`: Same shape as individual item in GET /api/products

**Response** `404`: `{ "error": "Product not found" }`

---

### `PUT /api/products/[id]`

Update an existing product.

**Auth**: Admin required

**Request Body**: Same as POST (partial updates supported)

**Response** `200 OK`: Updated product object

---

### `DELETE /api/products/[id]`

Delete a product.

**Auth**: Admin required

**Response** `200 OK`: `{ "success": true }`

---

### `POST /api/products/reorder`

Reorder products by updating their `sortOrder`.

**Auth**: Admin required

**Request Body**:
```json
{
  "orderedIds": ["uuid-1", "uuid-2", "uuid-3"]
}
```

**Response** `200 OK`: `{ "success": true }`

---

### `POST /api/products/bulk`

Bulk delete products.

**Auth**: Admin required

**Request Body**:
```json
{
  "ids": ["uuid-1", "uuid-2"],
  "action": "delete"
}
```

---

## 2. Categories

### `GET /api/categories`

Fetch all categories with product count.

**Auth**: Public
**Cache**: In-memory TTL 3600s (1 hour)

**Response** `200 OK`:
```json
[
  {
    "id": "uuid",
    "name": "Cakes",
    "products": 12,
    "createdAt": "2026-01-15T10:30:00.000Z"
  }
]
```

---

### `POST /api/categories`

Create a new category.

**Auth**: Admin required

**Request Body**:
```json
{
  "name": "Pastries"
}
```

**Response** `201 Created`:
```json
{
  "id": "uuid",
  "name": "Pastries",
  "products": 0,
  "createdAt": "2026-08-20T12:00:00.000Z"
}
```

**Response** `409 Conflict`: `{ "error": "A category with this name already exists" }`

---

### `PUT /api/categories/[id]`

Update a category name.

**Auth**: Admin required

**Request Body**: `{ "name": "Updated Name" }`

---

### `DELETE /api/categories/[id]`

Delete a category. Products in this category will have their `categoryId` set to null.

**Auth**: Admin required

---

### `POST /api/categories/reorder`

Reorder categories.

**Auth**: Admin required

**Request Body**: `{ "orderedIds": ["uuid-1", "uuid-2"] }`

---

## 3. Orders

### `GET /api/orders`

Fetch paginated order list (admin dashboard).

**Auth**: Admin required

**Query Parameters**:
| Param | Type | Default | Description |
|---|---|---|---|
| `status` | string | — | Filter by OrderStatus (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED, FAILED) |
| `sort` | string | `desc` | Sort direction for createdAt (asc/desc) |
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page (max 100) |

**Response** `200 OK`:
```json
{
  "orders": [
    {
      "id": "uuid",
      "totalAmount": 1250.00,
      "status": "PAID",
      "deliveryType": "DELIVERY",
      "createdAt": "2026-08-20T14:30:00.000Z",
      "customerName": "John Doe",
      "customerEmail": "john@example.com",
      "itemsCount": 3
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

### `GET /api/orders/[id]`

Fetch detailed order information.

**Auth**: Admin required

**Response** `200 OK`:
```json
{
  "id": "uuid",
  "totalAmount": 1250.00,
  "status": "PAID",
  "deliveryType": "DELIVERY",
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "deliveryDate": "2026-08-22",
  "notes": "Please deliver before 5pm",
  "createdAt": "2026-08-20T14:30:00.000Z",
  "updatedAt": "2026-08-20T14:35:00.000Z",
  "customer": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "addresses": [
      {
        "id": "uuid",
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 4B",
        "city": "Mumbai",
        "postalCode": "400001"
      }
    ]
  },
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "name": "Chocolate Truffle Cake",
      "image": "/uploads/abc.webp",
      "quantity": 1,
      "price": 850.00,
      "size": "1kg",
      "addons": "Extra Frosting, Candles",
      "total": 850.00
    }
  ]
}
```

---

### `PUT /api/orders/[id]`

Update order status.

**Auth**: Admin required

**Request Body**:
```json
{
  "status": "SHIPPED"
}
```

**Valid Statuses**: `PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED`, `FAILED`

---

## 4. Checkout & Payments

### `POST /api/checkout`

Create a Razorpay order and store a PENDING order in the database.

**Auth**: Public (Turnstile token required)
**Rate Limit**: 15/min per IP

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "addressLine1": "123 Main Street",
  "addressLine2": "Apt 4B",
  "city": "Mumbai",
  "postalCode": "400001",
  "distance": 5.2,
  "deliveryType": "DELIVERY",
  "deliveryDate": "2026-08-22",
  "additionalInfo": "Please deliver before 5pm",
  "totalAmount": 1250,
  "items": [
    {
      "productId": "uuid",
      "quantity": 1,
      "price": 850,
      "size": "1kg",
      "addons": "Extra Frosting"
    }
  ],
  "cf-turnstile-response": "turnstile-token-here"
}
```

**Validation Rules**:
- `email`: Valid email format
- `phone`: Exactly 10 digits
- `firstName`, `lastName`: Max 100 chars each
- `postalCode`: Exactly 6 digits (for delivery orders)
- `items`: 1–50 items, each with valid productId and quantity 1–100
- `addressLine1`, `city`: Required for DELIVERY orders; optional for PICKUP
- `deliveryType`: Must be `DELIVERY` or `PICKUP`

**Response** `200 OK`:
```json
{
  "success": true,
  "razorpayOrderId": "order_xxx",
  "amount": 125000,
  "currency": "INR",
  "orderId": "uuid"
}
```

---

### `POST /api/payment/verify`

Verify Razorpay payment signature and mark order as PAID.

**Auth**: Public
**Rate Limit**: 20/min per IP

**Request Body**:
```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "hmac-signature",
  "delivery_date": "2026-08-22"
}
```

**Verification Flow**:
1. Regenerate HMAC-SHA256 signature from `razorpay_order_id|razorpay_payment_id`
2. Timing-safe comparison with received signature
3. Update order status to `PAID` and store payment IDs
4. Send Telegram notification to the bakery owner

**Response** `200 OK`:
```json
{
  "success": true,
  "orderId": "uuid"
}
```

---

### `POST /api/webhooks/razorpay`

Razorpay server-to-server webhook for payment events.

**Auth**: Razorpay webhook signature verification

---

## 5. Filters

### `GET /api/filters`

Fetch all filter tags.

**Auth**: Public

**Response** `200 OK`:
```json
[
  { "id": "uuid", "name": "Chocolate" },
  { "id": "uuid", "name": "Fruit" },
  { "id": "uuid", "name": "Premium" }
]
```

---

### `POST /api/filters`

Create a new filter tag.

**Auth**: Admin required

**Request Body**: `{ "name": "Nutty" }`

---

### `DELETE /api/filters/[id]`

Delete a filter tag.

**Auth**: Admin required

---

### `POST /api/filters/bulk`

Bulk delete filter tags.

**Auth**: Admin required

**Request Body**: `{ "ids": ["uuid-1", "uuid-2"] }`

---

## 6. Contact

### `POST /api/contact`

Submit a contact form message.

**Auth**: Public (Turnstile token required)
**Rate Limit**: 3/hour per IP (DB-backed)

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I'd like to place a bulk order for a wedding.",
  "cf-turnstile-response": "turnstile-token"
}
```

**Response** `200 OK`:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Side Effects**: Sends a formatted message to the Telegram bot.

---

## 7. File Upload

### `POST /api/upload`

Upload a product image (admin only).

**Auth**: Admin required (cookie)

**Request**: `multipart/form-data` with a `file` field

**Constraints**:
- File type: `image/*` only
- Max size: 10MB
- Processing: Resized to max 1200px width, converted to WebP, quality 80

**Response** `200 OK`:
```json
{
  "url": "/uploads/a1b2c3d4e5f6.webp"
}
```

---

### `GET /uploads/:filename`

Serve an uploaded image file (rewrite rule → `/api/uploads/:filename`).

**Auth**: Public

---

## 8. Admin

### `POST /api/admin/login`

Authenticate as admin.

**Request Body**:
```json
{
  "password": "admin-password"
}
```

**Response** `200 OK`:
```json
{
  "success": true
}
```

Sets `admin_token` HttpOnly cookie.

---

### `POST /api/admin/logout`

Clear admin session.

**Response** `200 OK`: Clears `admin_token` cookie.

---

### `GET /api/admin/dashboard`

Fetch dashboard analytics.

**Auth**: Admin required

**Response** `200 OK`:
```json
{
  "totalProducts": 45,
  "featured": 8,
  "bestSellers": 5,
  "soldOut": 2,
  "flaggedBestSellers": [...],
  "realBestSellers": [
    {
      "id": "uuid",
      "name": "Chocolate Truffle",
      "price": 850,
      "category": "Cakes",
      "imageUrl": "/uploads/...",
      "totalSold": 127
    }
  ]
}
```

---

## 9. Queue (Virtual Waiting Room)

### `POST /api/queue/join`

Join the virtual queue.

**Request Body**: `{ "sessionId": "client-generated-uuid" }`

**Response** `200 OK`:
```json
{
  "status": "waiting",
  "position": 15,
  "estimatedWaitMs": 45000
}
```

Or if immediately admitted:
```json
{
  "status": "admitted",
  "token": "secure-token"
}
```

---

### `GET /api/queue/status`

Check current queue position.

**Query**: `?sessionId=xxx`

---

### `POST /api/queue/validate`

Validate an admitted queue token.

**Request Body**: `{ "token": "secure-token" }`

**Response** `200 OK`:
```json
{
  "valid": true,
  "queueEnabled": true
}
```

---

### `POST /api/queue/admin`

Admin queue control (enable/disable, set capacity, etc.).

**Auth**: Admin required

---

## 10. Delivery Dates

### `GET /api/delivery-dates/capacity`

Check which delivery dates are unavailable for the next 62 days.

**Auth**: Public
**Cache**: In-memory TTL 30s (busted immediately when an admin blocks/unblocks a date)

**Response** `200 OK`:
```json
{
  "fullyBookedDates": ["2026-09-03"],
  "blockedDates": ["2026-09-05", "2026-09-06"]
}
```

| Field | Meaning |
|---|---|
| `fullyBookedDates` | At capacity — 25 or more occupying orders (PAID, or PENDING within the last 15 minutes) |
| `blockedDates` | Manually disabled by the admin via the `blocked_dates` table |

Both lists are `YYYY-MM-DD` strings. They are returned separately so the checkout date picker can show "Full" and "N/A" as distinct states. On error the route returns empty lists rather than failing — the backend still rejects unavailable dates at checkout.

---

## 11. Blocked Delivery Dates (Admin)

Dates on which no products can be delivered. Enforced on the backend in `POST /api/checkout` — both as an upfront validation and again inside the order transaction, so a date disabled mid-checkout still rejects the order.

### `GET /api/admin/blocked-dates`

List disabled delivery dates.

**Auth**: Admin required (all methods, including GET)

**Query Parameters**:
| Param | Type | Default | Description |
|---|---|---|---|
| `includePast` | boolean | `false` | Also return dates already in the past |

**Response** `200 OK`:
```json
{
  "blockedDates": [
    {
      "id": "uuid",
      "date": "2026-09-05",
      "reason": "Closed for Diwali",
      "orderCount": 2,
      "createdAt": "2026-08-21T10:00:00.000Z"
    }
  ]
}
```

`orderCount` is how many PAID/SHIPPED/DELIVERED orders already exist on that date. Blocking is still permitted when this is non-zero — existing orders are not cancelled.

---

### `POST /api/admin/blocked-dates`

Disable delivery on one or more dates.

**Auth**: Admin required

**Request Body**:
```json
{
  "dates": ["2026-09-05", "2026-09-06"],
  "reason": "Closed for Diwali"
}
```

A single `{ "date": "2026-09-05" }` is also accepted. `reason` is optional (max 255 chars, HTML stripped).

**Validation Rules**:
- Each date must be a real calendar date in `YYYY-MM-DD` form
- Dates in the past (IST) are rejected
- Maximum 62 dates per request

**Response** `201 Created`:
```json
{
  "success": true,
  "blocked": 2,
  "alreadyBlocked": 0,
  "dates": ["2026-09-05", "2026-09-06"]
}
```

Idempotent — re-posting an already-disabled date is counted in `alreadyBlocked` rather than erroring.

---

### `DELETE /api/admin/blocked-dates`

Re-enable previously disabled dates.

**Auth**: Admin required

**Request Body**:
```json
{
  "dates": ["2026-09-05"]
}
```

**Response** `200 OK`:
```json
{
  "success": true,
  "unblocked": 1,
  "dates": ["2026-09-05"]
}
```

---

### Checkout rejection

When a customer submits an order for a disabled date:

**Response** `400 Bad Request`:
```json
{
  "success": false,
  "error": "We're not delivering on the selected date. Please choose another delivery date."
}
```
