import NextAuth from 'next-auth';
import { authConfig } from './lib/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = req.nextUrl.pathname === '/admin/login';

  // Redirect to login if accessing protected admin pages and not logged in
  if (isAdminRoute && !isLoginRoute && !isLoggedIn) {
    const signInUrl = new URL('/admin/login', req.nextUrl.origin);
    return Response.redirect(signInUrl);
  }

  // Protect write/modification endpoints on the API from unauthorized users
  if (isApiRoute && !isLoggedIn) {
    const method = req.method;
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      return Response.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
  }
});

export const config = {
  // Run middleware on admin pages and API routes
  matcher: ['/admin/:path*', '/api/v1/:path*'],
};
