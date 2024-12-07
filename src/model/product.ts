import { brands, categories } from "@/globalConsts";
import { ObjectId } from "mongodb";
import { z } from "zod";

const brandOptions = z.enum(brands)

export type Brand = z.infer<typeof brandOptions> ; 

export type Category = keyof typeof categories;

export type SubCategory<C extends Category> = typeof categories[C][number];
export type StockStatus = 'low' | 'available' | 'out';

export interface BaseProduct {
    _id?: string;
    barcode: string;
    name: string;
    measure: string;
    brand: Brand | string;
    description?: string;
    image: string;
    category: Category;
    subcategory: SubCategory<Category>;
}

export interface Product extends BaseProduct {
    searchString?: string;
    costPrice: number;
    price: number;
    stockStatus?: StockStatus;
    stock?: number;
}


export interface ProductByCategory<T extends Category> {
    _id?: ObjectId | string;
    barcode: string;
    name: string;
    quantity: string;
    price: number;
    brand: Brand | string;
    description: string;
    image: string;
    category: T;
    subcategory: SubCategory<T>;
}
