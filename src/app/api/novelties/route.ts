import { getNovelties } from "@/lib/mongo/novelties";
import { noveltiesSchema } from "@/model/novelties";
import { NextRequest, NextResponse } from "next/server";


const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const novelties = await getNovelties()
        return NextResponse.json(novelties, { headers })
    } catch (error: any) {
        if (error.message === 'Unexpected end of JSON input') return NextResponse.json({ error: "No se puedo leer correctamente el body" }, { status: 500, headers })
        return NextResponse.json({ error: error.message }, { status: 500, headers })

    }
}