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
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1') || hostname.startsWith('192.168.');
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
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Use the evaluated path for authentication checks
  const pathname = rewriteRequired ? url.pathname : request.nextUrl.pathname;

  // NOTE: /checkout access control is handled client-side in the checkout page
  // itself (redirects to /cart when cart is empty). No middleware redirect needed.

  // ── Queue enforcement is handled client-side by QueueGuard ────
  // (Edge Runtime middleware cannot access Node.js in-memory state,
  //  so queue gating is done via a client component in the root layout
  //  that calls /api/queue/validate on every navigation.)
  // ────────────────────────────────────────────────────────────────

  // Protect specific API routes
  const protectedRoutes = ['/api/products', '/api/categories', '/api/orders', '/api/filters'];

  const isProtectedApi = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    const isModifying = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);

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
      if (isAdminSubdomain) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
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
