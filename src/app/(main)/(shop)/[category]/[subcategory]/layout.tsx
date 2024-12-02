import { categories } from '@/app/admin/components/productConsts';
import { camelCaseToTitleCase, formatName } from '@/globalFunctions';
import { Category, SubCategory } from '@/model/product'
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';

const SubcategoryLayout = async ({ params, children }: { params: { category: Category, subcategory: SubCategory<Category> }, children: ReactNode }) => {
    const { category, subcategory } = params;

    return (
        <section className='size-full'>
            <div className='relative  flex justify-between px-3 w-full'>
                <Link href={`/${category}`} className=' text-lg text-blue-500 flex items-center gap-1 '><IoIosArrowBack /> {camelCaseToTitleCase(category)}</Link>
                <SubcategoriesSelector category={category} subcategory={subcategory} />
            </div>
            {children}
        </section>

    )
}

const SubcategoriesSelector = ({ category, subcategory }: { category: Category, subcategory: SubCategory<Category> }) => {

    const decodedSubcategory = decodeURIComponent(subcategory) as SubCategory<Category>;

    return (
        <div className='relative  d'>
            <button className="flex items-center gap-3  group peer text-2xl">
                    <IoIosArrowDown className='group-focus:rotate-180'/>
                <span className="ml-auto ">
                    {formatName(decodedSubcategory)}
                </span>
            </button>
            <div className='absolute inset-0 hidden peer-focus:block'></div>
            <ul className='text-lg max-h-0 peer-focus:max-h-[30rem] hover:max-h-[30rem] overflow-y-clip transition-[max-height_1s_ease-in-out] absolute z-50 bg-white shadow-md right-0 text-right'>

                {categories[category].map((value, key) => (
                    <li key={key} value={value} className=' p-2 odd:bg-slate-50 even:bg-slate-100 '>
                        <Link href={`/${category}/${value}`} className='hover:text-blue-500' replace>{formatName(value)}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SubcategoryLayout