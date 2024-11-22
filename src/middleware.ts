import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentHour = new Date().getHours();
  const open = currentHour > 7 && currentHour < 21

  const pathname = request.nextUrl.pathname
  const url = request.url

  if (!open) {
    const allowedToShopOvertime = cookies().has('allowedToShopOvertime');
    if (allowedToShopOvertime) return NextResponse.next()

    if (pathname.startsWith('/outside-hours')) return NextResponse.next();

    const redirectUrl = new URL('/outside-hours', url);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/outside-hours') && open) return NextResponse.redirect(new URL('/', url))

  return NextResponse.next();
}

const whenCloseHoursRequest = (url: string, pathname: string) => {



}


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|admin).*)',
}