import { categories } from "@/globalConsts"
import { camelCaseToTitleCase } from "@/globalFunctions"
import { Category } from "@/model/product"
import Link from "next/link"
import { IoIosArrowDown } from "react-icons/io"

const CategorySelector = ({ name }: { name: Category }) => {
    
    return (
        <div className='relative mr-2'>
            <button className="flex items-center gap-3  group peer text-2xl font-medium focus:text-blue-700">
                <IoIosArrowDown className='group-focus:rotate-180 transition duration-200' />
                <span className="ml-auto ">
                    {camelCaseToTitleCase(name)}
                </span>
            </button>
            <div className='absolute inset-0 hidden peer-focus:block'></div>
            <ul className='w-40 text-lg max-h-0 peer-focus:max-h-[30rem] hover:max-h-[30rem] overflow-y-clip transition-[max-height_1s_ease-in-out] absolute z-50 bg-white shadow-md right-0 text-right'>

                {Object.keys(categories).map((category, key) => (
                    <li key={key} value={category} className=' p-2 odd:bg-slate-50 even:bg-slate-100  '>
                        <Link href={`/${category}`} className='hover:text-blue-500' replace>{camelCaseToTitleCase(category)}</Link>
                    </li>
                ))}
            </ul>
        </div>)
}

export default CategorySelector