import { getOrdersByStatus } from "@/lib/mongo/orders"
import { Order, OrderStatus } from "@/model/order"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('status') as OrderStatus

    const res = await getOrdersByStatus(query) 

    const pendingOrders = JSON.parse(res) as Order[]
    return NextResponse.json(pendingOrders,
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json',
            },
        }
    )
}