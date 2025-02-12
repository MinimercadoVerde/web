import { ProductFromAdmin } from "@/model/product";
import axios from "axios";
import { NextResponse } from "next/server";

const api_url = `${process.env.MINIMARKETS_URL}/api/tenant`;
const headers = { 'api_key': process.env.API_KEY , 'tenant_id': process.env.TENANT_ID }

export async function uploadNewProduct(product: Pick<ProductFromAdmin, "barcode" | "name" | "brand" | "measure">) {
    try {

        return await axios.post(`${api_url}/product`,  product , { headers })
    } catch (error: any) {
        return NextResponse.json(error.message, { status: 500 })
    }

}