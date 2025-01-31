import { filterProducts, querySearch } from "@/lib/mongo/products";
import { Product, productSchema } from "@/model/product";
import { NextResponse, type NextRequest } from "next/server";

const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }

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
        return NextResponse.json(validParams.error.formErrors, { status: 400, headers })
    }

    try {
        const results = await filterProducts(query, { category: 1, subcategory: 1, name: 1 })

        return NextResponse.json(results, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(`Server error: ${error.message}`, { status: 500 })

    }
    
}