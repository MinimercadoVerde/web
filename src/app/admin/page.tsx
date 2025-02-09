import { formatPrice } from "@/utils/functions";
import { getProductsByStockStatus } from "@/lib/mongo/products";
import { Product } from "@/model/product";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
import ProductByStatus from "./components/ProductByStatus";
import SearchBar from "./components/SearchBar";
import "./styles.css";
const AdminPage = async () => {
  const outProducts = await getProductsByStockStatus("available") || [];
  const lowProducts = await getProductsByStockStatus("low") || [];

  return (
    <div className="p-5">
      <SearchBar />
      <section>
        <h1 className="my-10 text-xl font-semibold">Agotados</h1>
        <ul className="flex flex-wrap gap-3">
          {outProducts.map((product) => (
            <ProductByStatus key={product.barcode} product={product} />
          ))}
        </ul>
      </section>
      <section>
        <h1 className="my-10 text-xl font-semibold">Escasos</h1>
        <ul className="flex flex-wrap gap-3">
          {lowProducts.map((product) => (
            <ProductByStatus key={product.barcode} product={product} />
          ))}
        </ul>
      </section>
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
