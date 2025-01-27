import { brands, categories } from "@/globalConsts";
import { z } from "zod";

export type Category = typeof categories[number];
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
    subcategory: string;
    tags: string[]
}

const brandOptions = z.enum(brands)
export type Brand = z.infer<typeof brandOptions>;

export const baseProductSchema = z.object({//+
    _id: z.string().optional(),//+
    barcode: z.string(),//+
    name: z.string(),//+
    measure: z.string(),//+
    brand: z.union([brandOptions, z.string()]),//+
    description: z.string().optional(),//+
    image: z.string(),//+
    category: z.enum(categories),//+
    subcategory: z.string(),
    tags: z.array(z.string())
});

export const productSchema = baseProductSchema.extend({
    searchString: z.string().optional(),
    costPrice: z.number(),
    price: z.number().step(50),
    stockStatus: z.enum(['low', 'available', 'out']),
    stock: z.number().optional()
})

export type Product = z.infer<typeof productSchema>