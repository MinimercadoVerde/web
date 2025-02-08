import { NextResponse, NextRequest } from "next/server";

export function adminMiddleware(request: NextRequest) {
    const { url, nextUrl, cookies } = request;
    const pathname = nextUrl.pathname;

    const adminLogged = cookies.has('adminSession');

    if (!adminLogged) {
        if (pathname.startsWith('/admin/login')) return NextResponse.next();
        return NextResponse.redirect(new URL('/admin/login', url));
    }

    if (pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin', url));
    }

    return NextResponse.next();
}
