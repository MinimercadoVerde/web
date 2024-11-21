import { updateOrdersProducts } from "@/lib/mongo/orders"
import { findByBarcode, setProductStockStatus } from "@/lib/mongo/products"
import { Product, StockStatus } from "@/model/product"
import { UpdateResult } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }

export async function GET(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {
    const { barcode } = await params
    try {
        const res = await findByBarcode(barcode)
        if (res === undefined) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
        }
        const product: Product = JSON.parse(res)
        return NextResponse.json(product, { status: 200, headers })
    }catch {
        return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
    }
 }


export async function POST(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {
    const {barcode} = await params
    const searchParams = request.nextUrl.searchParams

    const query = searchParams.get('setStatus') as StockStatus | null

    if (!query) return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers })

    if (query !== "available" && query !== "low" && query !== "out") return NextResponse.json({ error: 'Invalid setStatus value' }, { status: 400, headers })

    try {

        const res = await setProductStockStatus(barcode, query)
        const product: UpdateResult<Product> = JSON.parse(res);
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
        updateOrdersProducts(barcode, query)
        return NextResponse.json(product, { status: product.matchedCount > 0 ? 200 : 404, headers })

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 400 })
    }

}