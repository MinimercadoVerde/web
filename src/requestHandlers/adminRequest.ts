import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const adminRequest = async (url: string, pathname: string) => {
    const adminLogged = (await cookies()).has('adminSession');

    if (!adminLogged) {
        if (pathname.startsWith('/admin/login')) return NextResponse.next();
        const redirectUrl = new URL('/admin/login', url);
        return NextResponse.redirect(redirectUrl)
    }

    if (pathname.startsWith('/admin/login')) return NextResponse.redirect(new URL('/admin', url));
    return NextResponse.next()
}

export default adminRequest;