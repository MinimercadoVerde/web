import { Metrics } from "@/model/metrics";
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from ".";
import { DateTime } from 'luxon'
import { Unit } from "@/model/order";

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

export async function upsertTodaysMetrics(saleValue: number, unit: Unit) {

    const now = DateTime.now().setZone("America/Bogota") as DateTime<true>
    if (!now) { throw new Error("Zone not supported") }

    const today = now.startOf('day').toBSON()
    const { month, year } = now
    const week = now.weekNumber
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
                    month,
                    week,
                    year,
                }
            },
            { upsert: true, returnDocument: 'after' }
        )
        return result

    } catch (error: any) {
        throw new Error(error.message)
    }

}