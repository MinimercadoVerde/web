import { formatPrice } from "@/globalFunctions";
import { getWithoutImageProducts } from "@/lib/mongo/products";
import { Product } from "@/model/product";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

const AdminPage = async () => {
  const result = await getWithoutImageProducts();
  const products: Product[] = JSON.parse(result);

  return (
    <div className="p-5">
      <h1 className="my-10 text-xl font-semibold">Productos sin imagenes</h1>
      <ul className="flex flex-wrap gap-3">
        {products.map((product) => (
          <NoImageProduct key={product.barcode} product={product} />
        ))}
      </ul>
    </div>
  );
};

const NoImageProduct = ({ product }: { product: Product }) => {
  const { barcode, price, name, brand, measure } = product;
  const fullName = `${name} - ${brand} - ${measure}`;
  return (
    <li className="max-w-sm bg-gray-100 p-2">
      <span className="line-clamp-2 h-14 text-lg">{fullName}</span>
      <div className="flex justify-between">
        <span>{formatPrice(price)}</span>
        <Link href={`/admin/edit-product/${barcode}`} className="flex">
          Editar
          <MdOutlineArrowOutward className="text-xl text-blue-500" />{" "}
        </Link>
      </div>
    </li>
  );
};

export default AdminPage;
