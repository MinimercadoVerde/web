import { Product } from "@/model/product";
import AddToCart from "./AddToCart";
import { formatPrice } from "@/utils/functions";
import ProductImage from "@/components/ProductImage";

const ProductCard = ({ product }: { product: Product }) => {
  const { name, image, measure, price, stockStatus } = product;

  const labelPrice = formatPrice(price);
  return (
    <div className="group relative w-[9.2rem] overflow-visible rounded-md bg-white shadow-md size-full">
      {stockStatus !== "out" && <AddToCart product={product} />}
      <div className="p-2">
        <div className="w-full">
          <ProductImage src={image} alt={name} />
        </div>
        <h3 className="my-2 line-clamp-2 font-medium leading-4 tracking-wide h-8">
          {name}
        </h3>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500">{measure}</span>
          <span className="text-sm font-medium text-slate-600">
            {labelPrice}
          </span>
        </div>
        {stockStatus === "out" && (
          <span className="absolute top-1/2 bg-white/80 px-3 font-semibold text-red-600">
            Agotado
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
