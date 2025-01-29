import { categories } from "@/globalConsts"
import { camelCaseToTitleCase, toKebabCase } from "@/globalFunctions"
import { Category } from "@/model/product"
import Link from "next/link"
import { IoIosArrowDown } from "react-icons/io"

const CategorySelector = ({ category }: { category: Category }) => {
    
    return (
        <div className='relative mr-2'>
            <button className="flex items-center gap-3 text-green-600 group peer sm:text-lg md:text-xl lg:text-2xl font-medium focus:text-green-700">
                <IoIosArrowDown className='group-focus:rotate-180 transition duration-200' />
                <span className="ml-auto ">
                    {camelCaseToTitleCase(category)}
                </span>
            </button>
            <div className='absolute inset-0 hidden peer-focus:block'></div>
            <ul className='w-40 text-lg max-h-0 peer-focus:max-h-[30rem] hover:max-h-[30rem] overflow-y-clip transition-[max-height_1s_ease-in-out] absolute z-50 bg-white shadow-md right-0 text-right'>

                {categories.map((category, key) => (
                    <li key={key} value={category} className=' p-2 odd:bg-slate-50 even:bg-slate-100  '>
                        <Link href={`/${encodeURIComponent(toKebabCase(category))}`} className='hover:text-green-500 size-full' replace>{camelCaseToTitleCase(category)}</Link>
                    </li>
                ))}
            </ul>
        </div>)
}

export default CategorySelector