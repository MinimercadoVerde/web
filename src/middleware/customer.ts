import { isStoreOpen } from "@/lib/store/utils";
import { NextResponse, NextRequest } from "next/server";


export function customerMiddleware(request: NextRequest) {
    const { url, nextUrl } = request;
    const pathname = nextUrl.pathname;

    const open = isStoreOpen();

    if (!open) {
        const allowedToShopOvertime = request.cookies.has('allowedToShopOvertime');
        if (allowedToShopOvertime) return NextResponse.next();

        if (pathname.startsWith('/outside-hours')) return NextResponse.next();

        return NextResponse.redirect(new URL('/outside-hours', url));
    }

    if (pathname.startsWith('/outside-hours') && open) {
        return NextResponse.redirect(new URL('/', url));
    }

    return NextResponse.next();
}
