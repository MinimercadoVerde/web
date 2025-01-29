import ProductImage from "@/components/ProductImage";
import { Product } from "@/model/product";

const ProductByStatus = ({ product }: { product: Product }) => {
  const {
    name,
    image,
    stockStatus,
  } = product;

  const colorByStatus = {
    low: "border-yellow-500",
    available: "border-green-500",
    out: "border-red-500",
    none: "border-gray-500",
  };

  return (
    <li className={`${colorByStatus[stockStatus || "none"]} w-32 border-2 rounded-xs`}>
      <ProductImage src={image} alt={name} />
      <div className="px-2">
        <h3 className="my-2 line-clamp-2 font-medium leading-5 tracking-wide">
          {name}
        </h3>
      </div>
    </li>
  );
};

export default ProductByStatus;
