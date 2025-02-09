import { getProductsBySubcategory } from "@/lib/mongo/products";
import { Category } from "@/model/product";
import React from "react";
import ProductCard from "../../components/ProductCard";
import { kebabToLowerCase } from "@/utils/functions";
import { categories, subcategories } from "@/utils/consts";

const slugify = (text: string) => text.replace(/\s+/g, "-").toLowerCase();

export async function generateStaticParams() {
  const params: { category: string; subcategory: string }[] = [];

  const excludedCategories: Category[] = ["cárnicos", "frutas y verduras"];

  for (const category of categories) {
    if (!excludedCategories.includes(category)) {
      const subcategoryList = subcategories[category];
      // Get the subcategories for the current category
      if (subcategoryList) {
        for (const subcategory of subcategoryList) {
          const encodedCategory = slugify(category); // Convert category to kebab-case
          const encodedSubcategory = slugify(subcategory); // Convert subcategory to kebab-case

          params.push({
            category: encodedCategory,
            subcategory: encodedSubcategory,
          });
        }
      }
    }
  }

  return params;
}
// export const dynamicParams = false;

const page = async ({
  params,
}: {
  params: Promise<{ category: Category; subcategory: string }>;
}) => {
  const { subcategory, category } = await params;

  const decodedSubcategory = decodeURIComponent(subcategory) as string;
  const decodedCategory = decodeURIComponent(category) as Category;
  const products = await getProductsBySubcategory(
    kebabToLowerCase(decodedCategory) as Category,
    kebabToLowerCase(decodedSubcategory),
  );

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] place-items-center gap-5 p-2 py-24">
      {products &&
        Array.isArray(products) &&
        products.map((product, key) => (
          <ProductCard product={product} key={key} />
        ))}
    </div>
  );
};

export default page;
