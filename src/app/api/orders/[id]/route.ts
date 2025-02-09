import { getOrderById, updateOrder } from "@/lib/mongo/orders"
import { orderSchema } from "@/model/order"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    try {

        const res = await getOrderById(id)
        const order = JSON.parse(res);
        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

        return NextResponse.json(order, { status: 200 })

    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}


const editableOrder = orderSchema.pick({ products: true, status: true, subtotal: true }).strict()

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const body = await request.json().then(value => !value ? NextResponse.json('Body not received', { status: 400 }) : value);
        const keys = Object.keys(await body);
        if (!(keys.length > 0)) return NextResponse.json('Body is empty', { status: 400 })

        const validBody = editableOrder.partial().safeParse(body)

        if (!validBody.success) return NextResponse.json(validBody.error.formErrors, { status: 400 })

        const res = await updateOrder(id, body)
        if (!res.success) return NextResponse.json(res.error, { status: 400 })

        return NextResponse.json(res, { status: 200 })
    }
    catch (error: any) {
        return error.message === "Unexpected end of JSON input" ? NextResponse.json("Body not received as expected", { status: 400 })
            :
            NextResponse.json({ error: error.message }, { status: 400 })
    }
}