import { Brand, Category } from "@/model/product"
import * as yup from "yup"

export type UploadProduct = {
    barcode: string;
    name: string;
    measure: string;
    costPrice: number;
    price: number;
    brand: Brand | string;
    description?: string;
    image?: string; // Not required when uploading initial products
    category: Category;
    subcategory: string;
    tags: string[] 
}

const productSchema: yup.ObjectSchema<UploadProduct> = yup.object({
    barcode: yup.string().required("Ingresa el código de barras del producto"),
    name: yup.string().required("Por favor ingresa el nombre del producto"),
    measure: yup.string().required(),
    costPrice: yup.number().typeError("Ingresa el costo del producto").required(),
    price: yup.number().min(50, "Ingresa un valor mayor a $ 50").test(
        'is-valid-step',
        'El precio debe ser múltiplo de 50',
        value => isValidStep(50, value)
    ).required().typeError("Por favor ingresa el precio del producto"),
    brand: yup.string().required("Por favor ingresa la marca del producto"),
    description: yup.string(),
    image: yup.string()
    // .required() Not required when uploading initial products
    ,
    subcategory: yup.string().required("Por favor ingresa la subcategoria"),
    category: yup.mixed<Category>().oneOf([
        "alimentos básicos", "cuidado e higiene", "mecato", "licor", "aseo", "bebidas", "mascotas", "otra"
    ]).required(),
    tags: yup.array().required()
})

const isValidStep = (step: number, value?: number,) => {
    if (value === undefined || value === null) return true; // Ignore validation if value is not set
    return (value % step === 0);
};
export default productSchema