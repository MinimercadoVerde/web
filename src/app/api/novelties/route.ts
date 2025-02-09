import { getNovelties } from "@/lib/mongo/novelties";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const novelties = await getNovelties()
        return NextResponse.json(novelties)
    } catch (error: any) {
        if (error.message === 'Unexpected end of JSON input') return NextResponse.json({ error: "No se puedo leer correctamente el body" }, { status: 500})
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}