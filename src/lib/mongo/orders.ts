'use server'
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "."
import { Order, OrderStatus } from "@/model/order";
import { cookies } from "next/headers";
import { StockStatus } from "@/model/product";
import { revalidatePath } from "next/cache";
import { upsertTodaysMetrics } from "./metrics";
import { getLocalDateTime } from "@/globalFunctions";

let client: MongoClient;
let db: Db;
let orders: Collection<Order>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        orders = db.collection('orders')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

export const setSessionId = () => {
    const sessionId = cookies().get('sessionId')?.value
    if (!sessionId) { const id = crypto.randomUUID(); cookies().set('sessionId', id) }
}

export async function uploadOrder(order: Order) {
    const sessionId = cookies().get('sessionId')?.value
    try {
        await init()
        const result = await orders.insertOne({ sessionId: sessionId, ...order })
        result.acknowledged && revalidatePath('/api/orders')
        return JSON.stringify(result)
    } catch (error: any) {
        console.log(error);
    }
}

export async function getOrdersBySessionId() {
    const sessionId = cookies().get('sessionId')?.value
    if (!sessionId) return JSON.stringify([]);
    try {
        await init()
        const result = await orders.find({ sessionId }).toArray()
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getOrderById(id: string) {
    try {
        await init()
        const result = await orders.findOne<Order>({ _id: new ObjectId(id) }, { projection: { sessionId: 0 } })
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function updateOrderStatus(id: string, status: OrderStatus) {
    try {
        await init()
        const result = await orders.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getOrdersByStatus(status?: OrderStatus) {
    try {
        await init()
        const {today} = getLocalDateTime()
        let result;
        if (!status) {
            result = await orders.find({createdAt: {$gt: today}}).toArray();
        } else {
            result = await orders.find<Order>({ status }).toArray();
        }
        return JSON.stringify(result);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function updateOrdersProducts(productBarcode: string, status: StockStatus) {
    try {
        await init()
        const result = await orders.updateMany({ "products.barcode": productBarcode },
            { $set: { "products.$[product].stockStatus": status } },
            { arrayFilters: [{ "product.barcode": productBarcode }] })
        revalidatePath('/api/orders')
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function updateOrder(orderId: string, order: Partial<Order>) {

    try {
        await init()
        const result = await orders.findOneAndUpdate({ _id: new ObjectId(orderId) }, { $set: order })
        if (!result) return { error: 'order not found', success: false }
        if (result.status !== "delivered" && order.status === "delivered" ) await upsertTodaysMetrics(result.subtotal + result.deliveryFee, result.deliveryAddress.unit)
        return { ...result, success: true }
    } catch (error: any) {
        return { error: error.message, success: false }
    }
}