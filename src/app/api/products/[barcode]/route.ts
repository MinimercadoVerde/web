import { updateOrdersProducts } from "@/lib/mongo/orders"
import { findByBarcode, updateProductValues } from "@/lib/mongo/products"
import { productSchema, } from "@/model/product"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }
export async function GET(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {
    const { barcode } = await params
    try {
        const product = await findByBarcode(barcode)
        if (!product) return NextResponse.json('Product not found', {status: 404, headers})
        return NextResponse.json(product, { status: 200, headers })
    } catch {
        return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
    }
}

const editableProduct = productSchema.pick({ stockStatus: true, price: true, costPrice: true }).partial().strict()
type EditableProduct = z.infer<typeof editableProduct>

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {
    const { barcode } = await params

    try {
        const body = await request.json() as EditableProduct
        if (!body) return NextResponse.json({ error: "Body not received" }, { status: 400, headers })

        const validBody = editableProduct.safeParse(body)
        if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400, headers })
        if (body.stockStatus !== undefined) {await updateOrdersProducts(barcode, body.stockStatus) }

        const res = await updateProductValues(barcode, body)
 
        return NextResponse.json(res, { status: res.success ? 200 : 400, headers })
    } catch (error: any) {

        if (error.message === "Unexpected end of JSON input") return NextResponse.json({ error: "Body not received as expected" }, { status: 400, headers })
        return NextResponse.json({ error: error.message }, { status: 500, headers })

    }
}