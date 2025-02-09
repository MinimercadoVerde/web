import { Metrics } from "@/model/metrics";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { Unit } from "@/model/order";
import { getLocalDateTime } from "@/utils/functions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

let client: MongoClient;
let db: Db;
let metrics: Collection<Metrics>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db(process.env.TENANT_ID)
        metrics = db.collection('metrics')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

export async function getTodayMetrics() {
    const { today } = getLocalDateTime()

    try {
        await init()
        const result = await metrics.findOne({ date: today })
        return result

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const timeFrameSchema = z.enum(["today", "week", "month", "year"])
export type TimeFrame = z.infer<typeof timeFrameSchema>

export async function getCurrentMetricsByTimeFrame(timeFrame: TimeFrame) {
    const timeFrames = getLocalDateTime()
    const current = timeFrames[timeFrame]

    if (timeFrame === "today") return getTodayMetrics()

    return getMetricByTimeFrame(timeFrame, current)
}
 
export async function getMetricByTimeFrame(timeFrame: TimeFrame, value: number | Date,) {

    try {
        await init()
        const result = await metrics.aggregate([
            { $match: { [timeFrame]: value } },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalSales" },
                    deliveredOrders: { $sum: "$deliveredOrders" },

                    senderoOrders: { $sum: "$ordersByUnit.sendero" },
                    villaOrders: { $sum: "$ordersByUnit.villa" },
                    bulevarOrders: { $sum: "$ordersByUnit.bulevar" },

                    senderoSales: { $sum: "$salesByUnit.sendero" },
                    villaSales: { $sum: "$salesByUnit.villa" },
                    bulevarSales: { $sum: "$salesByUnit.bulevar" },
                }
            },
            {
                $project: {
                    salesByUnit: {
                        sendero: "$senderoSales",
                        villa: "$villaSales",
                        bulevar: "$bulevarSales"
                    },
                    ordersByUnit: {
                        sendero: "$senderoOrders",
                        villa: "$villaOrders",
                        bulevar: "$bulevarOrders"
                    },
                    totalSales: 1,
                    deliveredOrders: 1,
                    _id: 0
                }
            }

        ]).toArray()
        return result[0]

    } catch (error: any) {
        throw new Error(error.message)
    }

}

export async function upsertTodaysMetrics(saleValue: number, unit: Unit) {
    const { today, week, month, year } = getLocalDateTime()

    try {
        await init()
        const result = await metrics.findOneAndUpdate(
            { date: today },
            {
                $inc: {
                    deliveredOrders: 1,
                    totalSales: saleValue,
                    [`ordersByUnit.${unit}`]: 1,
                    [`salesByUnit.${unit}`]: saleValue
                },
                $setOnInsert: {
                    date: today,
                    week,
                    month,
                    year,
                }
            },
            { upsert: true, returnDocument: 'after' }
        )
        revalidatePath("/api/metrics")
        return result

    } catch (error: any) {
        throw new Error(error.message)
    }

}