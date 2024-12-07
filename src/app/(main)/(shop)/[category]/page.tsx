import { getProductsByCategory } from '@/lib/mongo/products';
import { Category } from '@/model/product';
import React from 'react'
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { camelCaseToTitleCase } from '@/globalFunctions';
import CategorySelector from './CategorySelector';
import ProductCard from '../components/ProductCard';
import { categories } from '@/globalConsts';

export function generateStaticParams(): Category[] {
    return ['canastaFamiliar', 'higienePersonal', 'mecato', 'licor', 'aseo', 'bebidas', 'mascotas'] as Category[];
}

const CategoryPage = async ({ params }: { params: { category: Category } }) => {
    const {category} = params
    const products = await getProductsByCategory(category)

    return (
        <div className='w-full'>
            <div className='relative w-full flex justify-between px-3'>
                <Link href="/" className='text-lg text-blue-500 flex items-center gap-1 '><IoIosArrowBack/> Inicio</Link>
                <CategorySelector name={category} />
            </div>
            <div>
            <ul className='flex flex-wrap gap-7 justify-center my-6'>
                {categories[category].map((value, key) => (
                    <li key={key}>
                        <Link href={`/${category}/${value}`} className='text-blue-900 font-medium hover:underline'>
                            {camelCaseToTitleCase(value)}
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
            <section className='p-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-5 w-full place-items-center'>
                {products.map((product, key) => <ProductCard product={product} key={key} />)}
            </section>
        </div>
    )
}


export default CategoryPage