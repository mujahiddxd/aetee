import { NextResponse } from 'next/server';

// NOTE: This file uses the deprecated "middleware" convention in Next.js 16.
// It still works correctly. A future migration to route-level auth checks
// may be needed when Next.js fully removes middleware support.

/**
 * Verify the admin token using Web Crypto API (Edge Runtime compatible).
 * This computes the same HMAC-SHA256 as src/lib/auth.js (Node.js runtime).
 */
async function verifyAdminToken(tokenValue) {
  if (!tokenValue) return false;
  
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
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
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  let rewriteRequired = false;

  // Subdomain routing for Admin Panel
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  const isAdminSubdomain = hostname.startsWith('aeteesadmin.');

  if (isAdminSubdomain) {
    // Only rewrite non-API and non-static asset requests
    if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next') && !url.pathname.includes('.')) {
      if (url.pathname === '/') {
        url.pathname = '/admin';
        rewriteRequired = true;
      } else if (!url.pathname.startsWith('/admin')) {
        url.pathname = `/admin${url.pathname}`;
        rewriteRequired = true;
      }
    }
  } else {
    // Block direct access to /admin on the main domain (except on localhost for development)
    if (url.pathname.startsWith('/admin') && !isLocalhost) {
      url.pathname = '/404'; 
      return NextResponse.rewrite(url);
    }
  }

  // Use the evaluated path for authentication checks
  const pathname = rewriteRequired ? url.pathname : request.nextUrl.pathname;

  // ── Virtual Queue Gating ─────────────────────────────────────────
  // Routes that are EXEMPT from queue (must always be accessible):
  const queueExemptPaths = [
    '/queue',           // The queue waiting room itself
    '/api/queue',       // All queue API routes
    '/api/webhooks',    // Razorpay webhooks (must always reach the server)
    '/api/payment',     // Payment verification (user already past queue when paying)
    '/api/checkout',    // Checkout API (user already admitted, don't block mid-payment)
    '/api/admin',       // Admin API routes
    '/admin',           // Admin UI pages
  ];

  const isQueueExempt = queueExemptPaths.some(p => pathname.startsWith(p))
    || isAdminSubdomain
    || pathname.startsWith('/_next')
    || pathname.includes('.');  // Static files (.js, .css, .png, etc.)

  if (!isQueueExempt) {
    try {
      // Check queue status via internal API (Edge Runtime can't access Node.js memory)
      const queueToken = request.cookies.get('queue_token')?.value || '';
      const origin = request.nextUrl.origin;
      const validateRes = await fetch(
        `${origin}/api/queue/validate?token=${encodeURIComponent(queueToken)}`,
        { headers: { 'x-internal-queue-check': '1' } }
      );

      if (validateRes.ok) {
        const queueData = await validateRes.json();

        // If queue is enabled and token is not valid → redirect to /queue
        if (queueData.enabled && !queueData.valid) {
          return NextResponse.redirect(new URL('/queue', request.url));
        }
      }
      // If the validate endpoint fails, let the user through (fail-open)
    } catch (e) {
      // Network error talking to our own API — fail-open to avoid blocking everyone
      console.error('Queue validation error in middleware:', e);
    }
  }
  // ────────────────────────────────────────────────────────────────

  // Protect specific API routes
  const protectedRoutes = ['/api/products', '/api/categories', '/api/orders', '/api/filters'];

  const isProtectedApi = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    const isModifying = ['POST', 'PUT', 'DELETE'].includes(request.method);

    let requiresAuth = false;

    if (pathname.startsWith('/api/products') || pathname.startsWith('/api/categories') || pathname.startsWith('/api/filters')) {
      if (isModifying) requiresAuth = true;
    } else if (pathname.startsWith('/api/orders')) {
      // Allow the public cancel sub-route (used when user closes Razorpay popup)
      if (!pathname.endsWith('/cancel')) {
        requiresAuth = true;
      }
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

  if (rewriteRequired) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
