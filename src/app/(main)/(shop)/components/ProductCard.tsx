import { Product } from "@/model/product"
import AddToCart from "./AddToCart"
import { formatPrice } from "@/globalFunctions"
import ProductImage from "@/components/ProductImage"

const ProductCard = ({ product }: { product: Product }) => {
  const { name, image, measure, price, stockStatus } = product

  const labelPrice = formatPrice(price)
  return (
    <div className="group bg-white relative min-w-32 max-w-40 overflow-visible shadow-md rounded-md">
      {stockStatus !== 'out' && <AddToCart product={product} />}
      <div className="p-2">
        <ProductImage src={image} alt={name} />
        <h3 className="line-clamp-2 leading-4 font-medium tracking-wide my-2">{name}</h3>
        <div className="flex justify-between">
          <span className=" text-slate-500 text-sm">{measure}</span>
          <span className=" font-medium text-slate-600 text-sm">{labelPrice}</span>
        </div>
        {stockStatus === 'out' && <span className="text-red-600 font-semibold absolute top-1/2 bg-white/80 px-3">Agotado</span>}
      </div>
    </div>
  )
}

export default ProductCard