'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { createContext, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import '../forms-styles.css'
import Input from './Input'
import BarcodeInputs from './BarcodeInputs'
import ImageInput from './ImageInput'
import CategorySelector from './CategorySelector'
import PriceInput from './PriceInput'
import { uploadProduct } from '@/lib/mongo/products'
import productSchema, { UploadProduct } from '../productResolver';
import { Product } from '@/model/product'
import BrandInput from './BrandInput'
import CostPriceInput from './CostPriceInput'

interface StageContextProps {
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>> | (() => void)
}
export const StageContext = createContext<StageContextProps>({ stage: 0, setStage: () => { } });

const UploadProductForm = () => {
  const [stage, setStage] = useState(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'failed'>('idle')
  const form = useForm<UploadProduct>({
    resolver: yupResolver(productSchema),
  })

  const {control, formState, getValues, reset} = form

  const handleUploadProduct = async () => {
   setFormStatus("submitting")
   const product =  getValues()

   const result = await uploadProduct(product)
    if(!result) return setFormStatus("failed")
      setFormStatus("submitted")
      setStage(0)
      reset()
      alert("Producto creado con éxito!")
      return
 
  }

  switch (formStatus) {
    case "submitting":
      return <div>Cargando...</div>
    case "failed": 
      return <span>Fallo al intentar crear el producto ... Por favor comunícate con tu proveedor de software</span>
    default:
      return(
        <>
          <form action={handleUploadProduct} id='uploadProductForm'>
            <FormProvider {...form}>
              <StageContext.Provider value={{ stage, setStage }}>
                <BarcodeInputs />
                {/* <ImageInput />  no available while uploading initial products change showAt order when complete*/}
                <BrandInput showAt={1} />
                <Input id="name" name="name" label='Nombre' showAt={2} required />
                <Input id="description" name="description" label='Descripción' showAt={3} required />
                <Input id="measure" name="measure" label='Medida' showAt={4} required />
                <CostPriceInput showAt={5}/>
                <PriceInput showAt={6} />
                <CategorySelector showAt={7} />
              </StageContext.Provider>
            </FormProvider>
            {formState.isValid && <button type='submit' className='submit-button'> Crear producto </button>}
          </form>
          <button type='button' className='size-0 opacity-0 outline-none'>void focus out of page</button>
        </>
      )

  }
  

}

export default UploadProductForm