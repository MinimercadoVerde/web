import { Brand, Category, Product, Subcategories } from "@/model/product"
import * as yup from "yup"

export type UploadProduct = {
    barcode: string;
    confirmBarcode: string;
    name: string;
    measure: string;
    costPrice: number;
    price: number;
    brand: Brand | string;
    description: string;
    image?: string; // Not required when uploading initial products
    category: Category;
    subcategory: Subcategories[Category];
}

const productSchema: yup.ObjectSchema<UploadProduct> = yup.object({
    barcode: yup.string().required("Ingresa el código de barras del producto"),
    confirmBarcode: yup.string().oneOf([yup.ref("barcode")], "los códigos de barras no coinciden").required("Ingresa de nuevo el código de barras."),
    name: yup.string().required("Por favor ingresa el nombre del producto"),
    measure: yup.string().required(),
    costPrice: yup.number().typeError("Ingresa el costo del producto").required(),
    price: yup.number().min(50, "Ingresa un valor mayor a $ 50").test(
        'is-valid-step',
        'El precio debe ser múltiplo de 50',
        value => isValidStep(50, value)
    ).required().typeError("Por favor ingresa el precio del producto"),
    brand: yup.string().required("Por favor ingresa la marca del producto"),
    description: yup.string().required("Añade una descripción al producto"),
    image: yup.string()
    // .required() Not required when uploading initial products
    ,
    category: yup.mixed<Category>().oneOf([
        "canastaFamiliar", "higienePersonal", "mecato", "licor", "aseo", "bebidas", "mascotas"
    ]).required(),
    subcategory: yup.mixed<Subcategories[keyof Subcategories]>().test('is-valid-subcategory', 'Selecciona una subcategoría', (value) => (value?.length != 0)).required(),
})

const isValidStep = (step: number, value?: number,) => {
    if (value === undefined || value === null) return true; // Ignore validation if value is not set
    return (value % step === 0);
};
export default productSchema