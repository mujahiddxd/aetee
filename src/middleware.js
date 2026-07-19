import { NextResponse } from 'next/server';

// NOTE: This file uses the deprecated "middleware" convention in Next.js 16.
// It still works correctly. A future migration to route-level auth checks
// may be needed when Next.js fully removes middleware support.

// ── Simple Edge Rate Limiter ────────────────────────────────────────
// This stores requests per IP. In Edge runtimes, globals are scoped per isolate, 
// so this isn't a strict distributed rate limit, but it works well enough for VPS deployments.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100; // 100 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count += 1;
  return false;
}

// Cleanup stale entries
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);
// ────────────────────────────────────────────────────────────────────


/**
 * Verify the admin token using Web Crypto API (Edge Runtime compatible).
 * This computes the same HMAC-SHA256 as src/lib/auth.js (Node.js runtime).
 */
async function verifyAdminToken(tokenValue) {
  if (!tokenValue) return false;
  
  const secret = process.env.ADMIN_SECRET || 'aetee-default-secret-key-2026';
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode('admin-session'));
  const expectedToken = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return tokenValue === expectedToken;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Global API Rate Limiting
  if (pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';
               
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }
  }

  // Protect specific API routes
  const protectedRoutes = ['/api/products', '/api/categories', '/api/orders', '/api/filters'];

  const isProtectedApi = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    const isModifying = ['POST', 'PUT', 'DELETE'].includes(request.method);

    let requiresAuth = false;

    if (pathname.startsWith('/api/products') || pathname.startsWith('/api/categories') || pathname.startsWith('/api/filters')) {
      if (isModifying) requiresAuth = true;
    } else if (pathname.startsWith('/api/orders')) {
      requiresAuth = true;
    }

    if (requiresAuth) {
      const token = request.cookies.get('admin_token');
      const isValid = await verifyAdminToken(token?.value);

      if (!isValid) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
      }
    }
  }

  // Protect Admin UI Pages (except the login page itself)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token');
    const isValid = await verifyAdminToken(token?.value);

    if (!isValid) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect /api/admin/* routes (except login and logout)
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login') && !pathname.startsWith('/api/admin/logout')) {
    const token = request.cookies.get('admin_token');
    const isValid = await verifyAdminToken(token?.value);

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
