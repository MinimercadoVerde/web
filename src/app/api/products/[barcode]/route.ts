import { findByBarcode, updateProductValues } from "@/lib/mongo/products"
import { Product, productSchema, } from "@/model/product"
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
    } catch {
        return NextResponse.json({ error: 'Product not found' }, { status: 404, headers })
    }
}


const editableProduct = productSchema.pick({ stockStatus: true, price: true, costPrice: true }).strict()

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ barcode: string }> }) {
    const { barcode } = await params

    try {
        const body = await request.json()
        if (!body) return NextResponse.json({ error: "Body not received" }, { status: 400, headers })

        const validBody = editableProduct.partial().safeParse(body)
        if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400, headers })

        const res = await updateProductValues(barcode, body)

        return NextResponse.json(res, { status: res.success ? 200 : 400, headers })
    } catch (error: any) {

        if (error.message === "Unexpected end of JSON input") return NextResponse.json({ error: "Body not received as expected" }, { status: 400, headers })
        return NextResponse.json({ error: error.message }, { status: 500, headers })

    }
}