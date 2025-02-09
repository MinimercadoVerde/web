import { units } from "@/utils/consts"
import { z } from "zod"

const salesByUnit = z.record(z.enum(units), z.number())
const ordersByUnit = z.record(z.enum(units), z.number())

const metricsSchema = z.object({
    date: z.date(),
    week: z.number(),
    month: z.number(),
    year: z.number(),
    deliveredOrders: z.number(),
    totalSales: z.number(),
    salesByUnit,
    ordersByUnit
})

export type Metrics = z.infer<typeof metricsSchema>