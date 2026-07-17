import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect specific API routes
  const protectedRoutes = ['/api/products', '/api/categories', '/api/orders'];

  // Check if it's an admin path that modifies data or accesses secure data
  const isProtectedApi = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedApi) {
    // Only protect POST, PUT, DELETE for products/categories. GET is public.
    // For orders, all methods might be protected (admin only) EXCEPT checkout/payment.
    const isModifying = ['POST', 'PUT', 'DELETE'].includes(request.method);

    let requiresAuth = false;

    if (pathname.startsWith('/api/products') || pathname.startsWith('/api/categories')) {
      if (isModifying) requiresAuth = true;
    } else if (pathname.startsWith('/api/orders')) {
      // Orders API requires auth for all operations (admin view/update)
      requiresAuth = true;
    }

    if (requiresAuth) {
      const token = request.cookies.get('admin_token');

      if (!token || token.value !== 'authenticated') {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
      }
    }
  }

  // Protect Admin UI Pages (except the login page itself)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_token');

    if (!token || token.value !== 'authenticated') {
      // Redirect unauthenticated users to the admin login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to API routes and admin routes
  matcher: ['/api/:path*', '/admin/:path*'],
};
