'use server'

// import { Collection, Db, MongoClient } from "mongodb";
// import clientPromise from ".";

// let client: MongoClient;
// let db: Db;
// let products: Collection<Product>;

// export async function init() {
//     if (db) return
//     try {
//         client = await clientPromise
//         db = client.db(process.env.TENANT_ID)
//         products = db.collection('products')
//     } catch (error) {
//         throw new Error('Failed to stablish connection to database')
//     }
// }

// ;
// (async () => {
//     await init()
// })