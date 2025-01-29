"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import "../forms-styles.css";
import Input from "./Input";
import BarcodeInputs from "./BarcodeInputs";
import CategorySelector from "./CategorySelector";
import PriceInput from "./PriceInput";
import { uploadProduct } from "@/lib/mongo/products";
import productSchema, { UploadProduct } from "../productResolver";
import BrandInput from "./BrandInput";
import CostPriceInput from "./CostPriceInput";
import TagsInput from "./TagsInput";

const UploadProductForm = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "submitted" | "failed"
  >("idle");
  const form = useForm<UploadProduct>({
    resolver: yupResolver(productSchema),
  });

  const {  formState, getValues, reset, setFocus } = form;

  const handleUploadProduct = async () => {
    setFormStatus("submitting");
    const product = getValues();

    const result = await uploadProduct(product);
    if (!result) return setFormStatus("failed");
    setFocus("barcode");
    setFormStatus("submitted");

    reset();
    alert("Producto creado con éxito!");
    return;
  };

  switch (formStatus) {
    case "submitting":
      return <div>Cargando...</div>;
    case "failed":
      return (
        <h1 className="text-center text-4xl font-bold">
          Fallo al intentar crear el producto ... Por favor comunícate con tu
          proveedor de software
        </h1>
      );
    default:
      return (
        <>
          <form action={handleUploadProduct} id="uploadProductForm">
            <FormProvider {...form}>
              <BarcodeInputs />
              <Input id="name" name="name" label="Nombre" required />
              <BrandInput />
              <Input id="measure" name="measure" label="Medida" required />
              <CostPriceInput />
              <PriceInput />
              <CategorySelector />
             
            </FormProvider>
            {formState.isValid && (
              <button type="submit" className="submit-button">
                Crear producto
              </button>
            )}
          </form>
          <button type="button" className="size-0 opacity-0 outline-hidden">
            void focus out of page
          </button>
        </>
      );
  }
};

export default UploadProductForm;
