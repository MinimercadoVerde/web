"use client";
import { subcategories } from "@/utils/consts";
import {
  camelCaseToTitleCase,
  kebabToLowerCase,
  toKebabCase,
  toTitleCase,
} from "@/utils/functions";
import { Category } from "@/model/product";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

const SubcategorySelector = ({
  category = "alimentos básicos",
}: {
  category: Category;
}) => {
  const params = useParams();
  const decodedSubcategory = params.subcategory
    ? toTitleCase(
        decodeURIComponent(kebabToLowerCase(params.subcategory as string)),
      )
    : "Filtrar";

  return (
    <div className="relative">
      <button className="mx-auto group peer flex items-center gap-3 font-medium text-green-600 focus:text-green-700 sm:text-lg md:text-xl lg:text-2xl">
        <IoIosArrowDown className="transition duration-200 group-focus:rotate-180" />
        <span className="ml-auto">{decodedSubcategory}</span>
      </button>
      <div className="absolute inset-0 hidden peer-focus:block"></div>
      <ul className="w-full min-w-40 absolute right-0 z-50 max-h-0 overflow-y-scroll bg-white text-left text-lg shadow-md transition-[max-height_1s_ease-in-out] peer-focus:max-h-[30rem] lg:hover:max-h-[30rem]">
        <li className="bg-slate-50 p-3 text-green-700">
          <Link
            href={`/${encodeURIComponent(toKebabCase(category))}`}
            className="size-full hover:text-green-500"
            replace
          >
            Mostrar todos
          </Link>
        </li>
        {subcategories[category].map((subcategory, key) => (
          <li key={key} value={subcategory} className="p-1 odd:bg-slate-50 even:bg-slate-100">
            <Link
              href={`/${encodeURIComponent(toKebabCase(category))}/${encodeURIComponent(toKebabCase(subcategory))}`}
              replace
            >
              <div className="inset-0 p-2 hover:text-green-500">
                {camelCaseToTitleCase(subcategory)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategorySelector;
