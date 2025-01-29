import { getNovelties } from "@/lib/mongo/novelties";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }
    try {
        const novelties = await getNovelties()
        return NextResponse.json(novelties, { headers })
    } catch (error: any) {
        if (error.message === 'Unexpected end of JSON input') return NextResponse.json({ error: "No se puedo leer correctamente el body" }, { status: 500, headers })
        return NextResponse.json({ error: error.message }, { status: 500, headers })

    }
}