import { ProductFromAdmin } from "@/model/product";
import axios from "axios";

const api_url = `${process.env.MINIMARKETS_URL}/api/tenant`;
const headers = { 'api_key': process.env.API_KEY }
const tenantID = process.env.TENANT_ID

export async function uploadNewProduct(product: ProductFromAdmin) {

    return await axios.post(`${api_url}/product`, { product }, { headers })

}