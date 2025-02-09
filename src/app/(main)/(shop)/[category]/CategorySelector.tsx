import { categories } from "@/utils/consts";
import { camelCaseToTitleCase, toKebabCase } from "@/utils/functions";
import { Category } from "@/model/product";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const CategorySelector = ({ category }: { category: Category }) => {
  return (
    <div className="relative ">
      <button className="mx-auto group peer flex items-center gap-3 font-medium text-green-600 focus:text-green-700 sm:text-lg md:text-xl lg:text-2xl">
        <IoIosArrowDown className="transition duration-200 group-focus:rotate-180" />
        <span>{camelCaseToTitleCase(category)}</span>
      </button>
      <div className="absolute inset-0 hidden peer-focus:block"></div>
        <ul className="w-full absolute z-50 max-h-0 overflow-y-scroll bg-white text-left text-lg shadow-md transition-[max-height_1s_ease-in-out] peer-focus:max-h-[30rem] lg:hover:max-h-[30rem]">
          {categories.map((category, key) => (
            <li
              key={key}
              value={category}
              className="p-1 odd:bg-slate-50 even:bg-slate-100"
            >
              <Link
                href={`/${encodeURIComponent(toKebabCase(category))}`}
                className="size-full"
                replace
              >
                <div className="inset-0 p-2 hover:text-green-500">
                  {camelCaseToTitleCase(category)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default CategorySelector;
