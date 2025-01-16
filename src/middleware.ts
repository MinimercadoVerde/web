import type { NextRequest } from 'next/server'
import customerRequest from './requestHandlers/customerRequest';
import adminRequest from './requestHandlers/adminRequest';

export function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname
  const url = request.url
  const isAdminPath = pathname.startsWith('/admin');

  if (!isAdminPath) return customerRequest(url, pathname)

  return adminRequest(url, pathname)

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}