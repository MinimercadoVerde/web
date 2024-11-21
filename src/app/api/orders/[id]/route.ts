import { getOrderById, updateOrderStatus } from "@/lib/mongo/orders"
import { Order, OrderStatus } from "@/model/order"
import { UpdateResult } from "mongodb"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


const headers = { 'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json' }

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    try {

        const res = await getOrderById(id)
        const order = JSON.parse(res);
        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404, headers })

        return NextResponse.json(order, { status: 200, headers })

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 400, headers })
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const searchParams = request.nextUrl.searchParams

    const query = searchParams.get('setStatus') as OrderStatus | null

    if (!query) return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers })

    if (query !== "pending" && query !== "packed" && query !== "delivered") return NextResponse.json({ error: 'Invalid setStatus value' }, { status: 400, headers })

    try {

        const res = await updateOrderStatus(id, query)
        const order: UpdateResult<Order> = JSON.parse(res);
        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404, headers })
        revalidatePath('/api/orders')
        return NextResponse.json(order, { status: order.matchedCount > 0 ? 200 : 404, headers })

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 400 })
    }

}