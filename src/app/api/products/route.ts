import { getProductsByStockStatus } from "@/lib/mongo/products";
import { StockStatus } from "@/model/product";
import { NextRequest, NextResponse } from "next/server";

const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('stockStatus') as StockStatus | null

    if (!query) return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers })
        
    if (query !== "available" && query !== "low" && query !== "out") return NextResponse.json({ error: 'Invalid stockStatus value' }, { status: 400, headers })

    try {
        const res = await getProductsByStockStatus(query)
        return NextResponse.json(res, { status: 200, headers })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }        
}