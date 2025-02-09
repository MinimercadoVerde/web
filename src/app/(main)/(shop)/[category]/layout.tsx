import Link from "next/link";
import { ReactNode } from "react";
import { IoIosArrowBack } from "react-icons/io";
import CategorySelector from "./CategorySelector";
import SubcategorySelector from "./SubcategorySelector";
import { Category } from "@/model/product";
import { kebabToLowerCase } from "@/utils/functions";
import { categories } from "@/utils/consts";
const slugify = (text: string) => text.replace(/\s+/g, "-").toLowerCase();

export async function generateStaticParams() {
  const params: { category: string }[] = [];
  const excludedCategories: Category[] = ["cárnicos", "frutas y verduras"];

  for (const category of categories) {
    if (!excludedCategories.includes(category)) {
      const encodedCategory = slugify(category);
      params.push({ category: encodedCategory });
    }
  }
  return params;
}
export const dynamicParams = false;

const layout = async ({
  params,
  children,
}: {
  params: Promise<{ category: string; subcategory?: string }>;
  children: ReactNode;
}) => {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(
    kebabToLowerCase(category),
  ) as Category;

  return (
    <main>
      <div className="sticky top-0 z-30 w-full bg-stone-50 *:py-5 shadow-md">
        <div className="grid gap-2 md:gap-5 lg:gap-10 xl:gap-20 w-full grid-cols-3 place-items-center *:w-full">
          <Link
            href="/"
            className="flex items-center justify-center gap-1 text-green-600 sm:text-lg md:text-xl lg:text-2xl"
          >
            <IoIosArrowBack /> Inicio
          </Link>
          <CategorySelector category={decodedCategory} />
          <SubcategorySelector category={decodedCategory} />
        </div>
      </div>
      {children}
    </main>
  );
};

export default layout;
