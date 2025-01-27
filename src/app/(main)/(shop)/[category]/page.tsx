import { getProductsByCategory } from "@/lib/mongo/products";
import { Category } from "@/model/product";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { camelCaseToTitleCase, kebabToLowerCase } from "@/globalFunctions";
import CategorySelector from "./CategorySelector";
import ProductCard from "../components/ProductCard";
import { categories, subcategories } from "@/globalConsts";

export function generateStaticParams(): Category[] {
  return [
    "canastaFamiliar",
    "higienePersonal",
    "mecato",
    "licor",
    "aseo",
    "bebidas",
    "mascotas",
  ] as Category[];
}

const CategoryPage = async ({ params }: { params: Promise<{ category: Category }> }) => {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(kebabToLowerCase(category)) as Category
  const products = await getProductsByCategory(decodedCategory);

  return (
    <div className="w-full">
      <div className="sticky top-20 z-30 bg-stone-50 shadow-md mb-5">
        <div className="flex w-full justify-between ">
          <Link
            href="/"
            className="flex items-center gap-1 text-lg text-green-600"
          >
            <IoIosArrowBack /> Inicio
          </Link>
          <CategorySelector name={decodedCategory} />
        </div>
        <div>
          <ul className="py-3 flex flex-wrap justify-center gap-7">
            {subcategories[decodedCategory]?.map((value, key) => (
              <li key={key}>
                <Link
                  href={`/${category}/${value}`}
                  className="font-medium text-slate-900 hover:text-green-600 hover:underline"
                >
                  {camelCaseToTitleCase(value)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] place-items-center gap-5 p-2">
        {products.map((product, key) => (
          <ProductCard product={product} key={key} />
        ))}
      </section>
    </div>
  );
};

export default CategoryPage;
