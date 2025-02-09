import { filterProducts, querySearch, uploadNewFromAdmin } from "@/lib/mongo/products";
import { Product, productFromAdminSchema, productSchema } from "@/model/product";
import { NextResponse, type NextRequest } from "next/server";


export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    if (search) {
        try {
            const results = await querySearch(search)
            return NextResponse.json(results, { status: 200 })
        } catch (error: any) {
            return NextResponse.json(`Server error: ${error.message}`, { status: 500 })
        }
    }
    const hasParams = searchParams.size > 0

    if (!hasParams) return NextResponse.json("No query parameter received", { status: 200 })

    const query = Object.fromEntries(searchParams) as Partial<Product>

    const validParams = productSchema.partial().safeParse(query)
    if (!validParams.success) {
        return NextResponse.json(validParams.error.formErrors, { status: 400 })
    }

    try {
        const results = await filterProducts(query, { category: 1, subcategory: 1, name: 1 })

        return NextResponse.json(results, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(`Server error: ${error.message}`, { status: 500 })

    }

}

export async function POST(request: NextRequest) {

    const body = await request.json() as Product
    if (!body) return NextResponse.json("No body received", { status: 400 })

    if (!body.barcode) return NextResponse.json("No barcode received", { status: 400 })


    const validBody = productFromAdminSchema.safeParse(body)

    if (!validBody.success) {
        return NextResponse.json(validBody.error.formErrors, { status: 400 })
    }

    try {
        const result = await uploadNewFromAdmin(body)
        if (!result) NextResponse.json(result, { status: 500 })

        return NextResponse.json(result, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(`Server error: ${error.message}`, { status: 500 })
    }

}