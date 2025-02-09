import { getOrdersByStatus } from "@/lib/mongo/orders"
import { Order, OrderStatus } from "@/model/order"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('status') as OrderStatus

    const res = await getOrdersByStatus(query)

    const pendingOrders = JSON.parse(res) as Order[]
    return NextResponse.json(pendingOrders, { status: 200 })
}