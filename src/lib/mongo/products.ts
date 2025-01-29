'use server'
import { Collection, Db, MongoClient, OptionalId } from "mongodb";
import clientPromise from "."
import { BaseProduct, Category, Product, StockStatus } from "@/model/product";
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
    const { barcode, name, price, brand, category, measure, costPrice, tags, subcategory } = product
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
        stockStatus: 'available',
        tags,
    }

    const baseProductPayload: BaseProduct = {
        barcode,
        name: formatName(name),
        measure,
        brand: formatName(name),
        description: '',
        image: '',
        category,
        subcategory,
        tags
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
        const result = await products.find({ category }, { projection: { _id: 0 } }).sort({ subcategory: 1, brand: 1, measure: 1, name: 1 }).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)

    }
}
export async function getSamplesByCategory(category: Category, sample?: number) {

    try {
        await init()
        if (sample) {
            const result = await products.aggregate([{ $match: { category } }, { $sample: { size: sample } }, { $project: { _id: 0 } }]).toArray();
            return result as Product[]
        }
        const result = await products.find({ category }, { projection: { _id: 0 } }).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)

    }
}
export async function getProductsBySubcategory(category: Category, subcategory: string) {
    try {
        // Inicializar la conexión si es necesario
        await init();

        // Realizar la consulta en la base de datos
        const result = await products.find({ category, subcategory }, { projection: { _id: 0 } })
            .sort({ name: 1, brand: 1 })
            .toArray();

        return result;
    } catch (error: any) {
        // Manejar el error con más detalles
        console.error("Error while fetching products:", error);
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
}


export async function getProductsByStockStatus(status: StockStatus) {

    try {
        await init()
        const result = await products.find({ stockStatus: status }, { projection: { _id: 0 } }).limit(10).toArray();
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
    const { barcode, name, price, description, brand, category, costPrice, image, measure, tags } = product
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
        tags,
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