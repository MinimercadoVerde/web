"use client";
import { subcategories } from "@/globalConsts";
import {
  camelCaseToTitleCase,
  kebabToLowerCase,
  toKebabCase,
  toTitleCase,
} from "@/globalFunctions";
import { Category } from "@/model/product";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

const SubcategorySelector = ({
  category = "canasta familiar",
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
    <div className="relative mr-2">
      <button className="group peer flex items-center gap-3 font-medium text-green-600 focus:text-green-700 sm:text-lg md:text-xl lg:text-2xl">
        <IoIosArrowDown className="transition duration-200 group-focus:rotate-180" />
        <span className="ml-auto">{decodedSubcategory}</span>
      </button>
      <div className="absolute inset-0 hidden peer-focus:block"></div>
      <ul className="absolute right-0 z-50 max-h-0 w-40 overflow-y-scroll bg-white text-right text-lg shadow-md transition-[max-height_1s_ease-in-out] hover:max-h-[30rem] peer-focus:max-h-[30rem]">
        <li>
            <Link
              href={`/${encodeURIComponent(toKebabCase(category))}`}
              className="size-full hover:text-green-500"
              replace
            >
              Mostrar todos
            </Link>
        </li>
        {subcategories[category].map((subcategory, key) => (
          <li
            key={key}
            value={subcategory}
            className="p-2 odd:bg-slate-50 even:bg-slate-100"
          >
            <Link
              href={`/${encodeURIComponent(toKebabCase(category))}/${encodeURIComponent(toKebabCase(subcategory))}`}
              className="size-full hover:text-green-500"
              replace
            >
              {camelCaseToTitleCase(subcategory)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategorySelector;
