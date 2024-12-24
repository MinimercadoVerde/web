'use server'
import { Collection, Db, MongoClient, OptionalId } from "mongodb";
import clientPromise from "."
import { BaseProduct, Category, Product, StockStatus, SubCategory } from "@/model/product";
import { formatName } from "@/globalFunctions";
import { revalidatePath } from "next/cache";
import { UploadProduct } from "@/app/admin/components/forms/productResolver";
import axios from "axios";

let client: MongoClient;
let db: Db;
let products: Collection<Product>;


export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        products = db.collection('products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}

;
(async () => {
    await init()
})

export async function querySearch(query: string) {
    try {
        if (query.length < 3) return JSON.stringify([])
        await init()
        const result = await products.aggregate([
            {
                $search: {
                    index: "default",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: query,
                                    path: "searchString",
                                    fuzzy: {
                                        maxEdits: 1
                                    }
                                }
                            },
                            {
                                text: {
                                    query: query,
                                    path: "name",
                                    score: { boost: { value: 2 } } // Increase the score for exact matches
                                }
                            }
                        ]
                    }
                }
            }
        ]).toArray();

        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function findByBarcode(barcode: string) {
    try {
        await init()

        const result = await products.findOne({ barcode: barcode })

        return result?.barcode && result

    } catch (error: any) {
        throw new Error(error)
    }
}


export async function uploadProduct(product: UploadProduct) {
    const { barcode, name, price, brand, category, measure, subcategory, costPrice } = product
    const searchString = `${name} ${brand} ${measure}`.toLowerCase().trim()

    const productPayload: OptionalId<Product> = {
        searchString,
        barcode,
        name: formatName(name),
        brand: formatName(brand),
        description: '', // default '' while uploading initial products
        image: '', // default '' while uploading initial products
        measure,
        category,
        subcategory,
        costPrice: Number(costPrice),
        price: Number(price),
        stockStatus: 'available'
    }

    const baseProductPayload: BaseProduct = {
        barcode,
        name: formatName(name),
        measure,
        brand: formatName(name),
        description: '',
        image: '',
        category,
        subcategory
    }


    const uploadToMain = await axios.post(`${process.env.MINIMARKETS_URL}/api/products`, baseProductPayload).then(response => response).catch((error) => { console.log(error.message); return null })

    if (!uploadToMain?.data.acknowledged) return null;

    try {
        await init()
        const result = await products.insertOne(productPayload)
        result.insertedId && revalidatePath('/', 'layout')
        return JSON.stringify(result)

    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getProductsByCategory(category: Category) {

    try {
        await init()
        const result = await products.find({ category }, { projection: { _id: 0 } }).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)

    }
}
export async function getProductsBySubcategory(subcategory: SubCategory<Category>) {

    try {
        await init()
        const result = await products.find({ subcategory }, { projection: { _id: 0 } }).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getProductsByStockStatus(status: StockStatus) {

    try {
        await init()
        const result = await products.find({ stockStatus: status }, { projection: { _id: 0 } }).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function updateProductValues(barcode: string, body: Partial<Product>) {
    try {
        await init()
        const result = await products.updateOne({ barcode }, { $set: body })
        if (result.matchedCount <= 0) return { error: 'product not found', success: false }
        revalidatePath('/', 'layout')
        return { ...result, success: true }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export async function updateProduct(product: UploadProduct) {
    const { barcode, name, price, description, brand, category, costPrice, image, measure, subcategory } = product
    const searchString = `${name} ${brand} ${measure}`.toLowerCase().trim()

    const productPayload = {
        searchString,
        barcode,
        name: formatName(name),
        price,
        brand: formatName(brand),
        description,
        image,
        measure,
        costPrice,
        category,
        subcategory,
        stock: 0
    }
    try {
        await init()
        const result = await products.updateOne({ barcode }, { $set: productPayload })
        result.modifiedCount > 0 && revalidatePath('/', 'layout')
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}


export async function getAllProducts() {
    try {
        await init()
        const result = await products.find({}).toArray();
        return JSON.stringify(result)
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function getWithoutImageProducts() {
    try {
        await init()
        const result = await products.find({ image: '' }).toArray();
        return JSON.stringify(result)
    } catch (err: any) {
        throw new Error(err.message)
    }
}