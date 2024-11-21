'use client'
import { FormProvider, useForm } from 'react-hook-form'
import '../forms-styles.css'
import { yupResolver } from '@hookform/resolvers/yup'
import productSchema from '../productResolver'
import { Product } from '@/model/product'
import Input from './Input'
import PriceInput from './PriceInpur'
import BrandInput from './BrandInput'
import CategorySelector from './CategorySelector'
import ImageInput from './ImageInput'
import { useFormStatus } from 'react-dom'
import { DevTool } from "@hookform/devtools";
import { useState } from 'react'
import { editProduct } from '@/lib/mongo/products'
import CostPriceInput from './CostPriceInput'

const EditProductForm = ({ product }: { product: Product }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'failed'>('idle')
  const form = useForm({ resolver: yupResolver(productSchema), defaultValues: { confirmBarcode: product.barcode, ...product } })
  const { formState: { isValid, }, getValues, register } = form

  const handleEditProduct = async () => {
    setFormStatus("submitting")
    const updatedProduct = getValues()
    const result = await editProduct(updatedProduct)
    if (!result) return setFormStatus("failed")
    setFormStatus("submitted")
    alert("Producto actualizado con éxito")
  }

  return (
    <form id='uploadProductForm' action={handleEditProduct}>
      <FormProvider {...form}>
        <input hidden {...register("barcode")} readOnly />
        <input hidden {...register("confirmBarcode")} readOnly />
        <Input name="name" label='Nombre' />
        <BrandInput />
        <ImageInput />
        <CostPriceInput />
        <PriceInput />
        <Input name="description" label='Descripción' />
        <CategorySelector />
        <DevTool {...form} />
        <button type='submit' disabled={!isValid} className='submit-button'>
          {formStatus === "submitting" ? 'Cargando...' : 'Actualizar Producto'}
        </button>
      </FormProvider>
    </form>
  )
}

export default EditProductForm