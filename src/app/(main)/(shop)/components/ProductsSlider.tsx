import { Category } from "@/model/product"
import ProductCard from "./ProductCard"
import { getProductsByCategory } from "@/lib/mongo/products"

const ProductsSlider = async ({ title, category }: { title: string, category: Category }) => {
  const products  = await getProductsByCategory(category)
   
  return (
    <section >
      <h2 className="p-5 pb-0 text-gray-400 font-semibold">{title}</h2>
      <div className="px-5 w-full overflow-x-auto overflow-y-hidden" >
        <div className="grid grid-flow-col gap-6 place-items-center py-5 pr-1 w-fit">
          {
            products.filter((product) => product.category === category).map((product) => (
              <ProductCard product={product} key={product.barcode} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default ProductsSlider