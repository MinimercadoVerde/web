'use server'

import { querySearch } from "./products"

export async function searchItemByQuery(query:string) {
    
    const results = await querySearch(query)
}