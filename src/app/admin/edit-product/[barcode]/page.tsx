import { findByBarcode } from '@/lib/mongo/products'
import EditProductForm from '../../components/forms/editProduct/EditProductForm'

const updateProductByBarcode = async ({params}: {params:Promise<{barcode: string}>}) => {

  const product = await findByBarcode((await params).barcode)
  if (!product) {
    return <div>Product not found.</div>
  }
  
  return (
    <div>
      <EditProductForm product={product}/>
    </div>
  )
}

export default updateProductByBarcode