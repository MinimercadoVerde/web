'use server'
import { Collection, Db, MongoClient } from "mongodb";
import clientPromise from "."
import { User } from "@/model/user";

let client: MongoClient;
let db: Db;
let users: Collection<User>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        users = db.collection('users')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})
