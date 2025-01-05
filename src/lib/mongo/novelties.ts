'use server'
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "."
import { NewProductReport, Novelties, PendingValidationReport } from "@/model/novelties";

let client: MongoClient;
let db: Db;
let novelties: Collection<Novelties>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        novelties = db.collection('novelties')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})


export async function postPendingValidationReport (body: PendingValidationReport){
    await init()
    return novelties.updateOne({},{"$push": {pendingValidation: body} })
}

export async function postNewProductReport (body: NewProductReport){
    await init()
    return novelties.updateOne({},{"$push": {newProducts: body} })
}

export async function getNovelties() {

    await init()
    return novelties.findOne({})

}
