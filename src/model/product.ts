import { brands, categories } from "@/globalConsts";
import { ObjectId } from "mongodb";
import { z } from "zod";

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

const brandOptions = z.enum(brands)
export type Brand = z.infer<typeof brandOptions>;

const category = z.enum(Object.keys(categories) as [Category, ...Category[]])

const subcategorySchema = z.custom<SubCategory<Category>>((value) => {
    const allSubcategories = Object.values(categories).flat();
    return allSubcategories.includes(value);
  }, { message: "Invalid subcategory" });

export const baseProductSchema = z.object({//+
    _id: z.string().optional(),//+
    barcode: z.string(),//+
    name: z.string(),//+
    measure: z.string(),//+
    brand: z.union([brandOptions, z.string()]),//+
    description: z.string().optional(),//+
    image: z.string(),//+
    category,//+
    subcategory: subcategorySchema,//+
});

export const productSchema = baseProductSchema.extend({
    searchString: z.string().optional(),
    costPrice: z.number(),
    price: z.number().step(50),
    stockStatus: z.enum(['low', 'available', 'out']).optional(),
    stock: z.number().optional()
})

export type Product = z.infer<typeof productSchema>

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