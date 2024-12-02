import { findByBarcode } from '@/lib/mongo/products'
import { Product } from '@/model/product'
import React from 'react'
import EditProductForm from '../../components/forms/editProduct/EditProductForm'

const updateProductByBarcode = async ({params}: {params:{barcode: string}}) => {

  const getProduct = await findByBarcode(params.barcode)
  if (!getProduct) {
    return <div>Product not found.</div>
  }

  const product = JSON.parse(getProduct) as Product
  
  return (
    <div>
      <EditProductForm product={product}/>
    </div>
  )
}

export default updateProductByBarcode