import { APIAuth } from '@/lib/auth/actions';
import { NextResponse, NextRequest } from 'next/server';

export function apiMiddleware(req: NextRequest) {
    const api_key = req.headers.get("api_key");

    if (!APIAuth(api_key)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
}