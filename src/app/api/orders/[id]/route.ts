import { getOrderById, updateOrder } from "@/lib/mongo/orders"
import {  orderSchema } from "@/model/order"
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


const editableOrder = orderSchema.pick({ products: true, status: true, subtotal: true }).strict()

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const body = await request.json();
        const keys = Object.keys(body);
        if (!(keys.length > 0)) return NextResponse.json('Body not received', { status: 400, headers })

        const validBody = editableOrder.partial().safeParse(body)

        if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400, headers })

        const res = await updateOrder(id, body)
        if (!res.success) return NextResponse.json(res.error, { status: 400, headers })

        return NextResponse.json(res, { status: 200, headers })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400, headers })
    }
}