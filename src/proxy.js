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

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect specific API routes
  const protectedRoutes = ['/api/products', '/api/categories', '/api/orders'];

  const isProtectedApi = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    const isModifying = ['POST', 'PUT', 'DELETE'].includes(request.method);

    let requiresAuth = false;

    if (pathname.startsWith('/api/products') || pathname.startsWith('/api/categories')) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
};
