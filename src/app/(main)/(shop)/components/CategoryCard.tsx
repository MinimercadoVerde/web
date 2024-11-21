import { camelCaseToTitleCase, formatName } from "@/globalFunctions"
import { Category } from "@/model/product"
import Link from "next/link"

const CategoryCard = ({category, children}:{category:Category, children: React.ReactNode }) => {
    return (
      <Link className="flex flex-col items-center" href={`/${category}`}>
        <figure className="w-16 sm:w-20 md:w-24 aspect-square bg-gray-50 rounded-lg object-fill p-1">
            {children}
        </figure>
        <span className="sm:text-lg font-light">{camelCaseToTitleCase(category)}</span>
      </Link>
    )
  }
export default CategoryCard