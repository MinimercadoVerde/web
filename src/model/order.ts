import { StockStatus } from "./product";
import { units } from "@/globalConsts";
import { ObjectId } from "mongodb";
import { z } from "zod";

const orderProductSchema = z.object({
    barcode: z.string(),
    image: z.string(),
    quantity: z.number().min(1),
    totalPrice: z.number().min(0),
    unitPrice: z.number().min(0),
    name: z.string(),
    measure: z.string(),
    category: z.string(),
})

export type OrderProduct = z.infer<typeof orderProductSchema>

export type OrderStatus = 'pending' | 'packed' | 'delivered';
export const unit = z.enum(units)

export const orderSchema = z.object({
    sessionId: z.string().optional(),
    products: z.array(orderProductSchema),
    customerName: z.string(),
    customerPhone: z.string().min(10).max(15),
    deliveryAddress: z.object({
        building: z.number(),
        apartment: z.number(),
        unit,
    }),
    createdAt: z.date(),
    subtotal: z.number(),
    deliveryFee: z.number(),
    status: z.enum(['pending', 'packed', 'delivered']),
})
export type Unit = z.infer<typeof unit>
export type Order =  z.infer<typeof orderSchema> & {_id?: ObjectId | string}