import { Metrics } from "@/model/metrics";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { Unit } from "@/model/order";
import { getLocalDateTime } from "@/globalFunctions";
import { revalidatePath } from "next/cache";

let client: MongoClient;
let db: Db;
let metrics: Collection<Metrics>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
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
    const {today} =  getLocalDateTime()

    try {
        await init()
        const result = await metrics.findOne({ date: today })
        return result 
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function upsertTodaysMetrics(saleValue: number, unit: Unit) {
    const {today, week, month, year} =  getLocalDateTime()

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