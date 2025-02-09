import { brands, categories } from "@/utils/consts";
import { z } from "zod";

const brandOptions = z.enum(brands)
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
    tags: z.array(z.string()),
    show: z.boolean().optional()
});


export const productSchema = baseProductSchema.extend({
    searchString: z.string().optional(),
    costPrice: z.number(),
    price: z.number().step(50),
    measure: z.string(),
    stockStatus: z.enum(['low', 'available', 'out']),
    stock: z.number().optional()
})

export const productFromAdminSchema = productSchema.pick({ barcode: true, name: true, measure: true, brand: true, price: true, costPrice: true })

export type StockStatus = 'low' | 'available' | 'out';
export type Category = typeof categories[number];
export type Brand = z.infer<typeof brandOptions>;
export type BaseProduct = z.infer<typeof baseProductSchema>
export type Product = z.infer<typeof productSchema>
export type ProductFromAdmin = z.infer<typeof productFromAdminSchema>