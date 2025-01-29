import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const customerRequest = async (url: string, pathname: string) => {

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Bogota',
      hour: 'numeric',
      hour12: false,
    });
  
    const currentHour = Number(formatter.format(new Date()));
    // const open = currentHour > 7 && currentHour < 21
    const open = true // this is just while updates initial products
  
    if (!open) {
      const allowedToShopOvertime = (await cookies()).has('allowedToShopOvertime');
      if (allowedToShopOvertime) return NextResponse.next()
  
      if (pathname.startsWith('/outside-hours')) return NextResponse.next();
  
      const redirectUrl = new URL('/outside-hours', url);
      return NextResponse.redirect(redirectUrl);
    }
  
    if (pathname.startsWith('/outside-hours') && open) return NextResponse.redirect(new URL('/', url))
  }
  
  export default customerRequest;