import type { NextRequest } from 'next/server';
import { apiMiddleware } from './middleware/api';
import { customerMiddleware } from './middleware/customer';
import { adminMiddleware } from './middleware/admin';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // For API routes, check for API authentication
  if (pathname.startsWith('/api')) {
    return apiMiddleware(request);
    // API authentication
  }

  // For admin or customer requests, route appropriately
  const isAdminPath = pathname.startsWith('/admin');
  return isAdminPath ? adminMiddleware(request) : customerMiddleware(request);
}

// Middleware applies to all routes except certain exclusions
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};
