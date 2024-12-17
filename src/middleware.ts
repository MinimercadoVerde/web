import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    hour: 'numeric',
    hour12: false,
  });

  const currentHour = Number(formatter.format(new Date())) 
  ;
  // const open = currentHour > 7 && currentHour < 21
  const open = true // this is just while updates initial products

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