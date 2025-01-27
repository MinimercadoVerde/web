import { getProductsBySubcategory } from '@/lib/mongo/products'
import { Category } from '@/model/product'
import React from 'react'
import ProductCard from '../../components/ProductCard';
import { kebabToLowerCase } from '@/globalFunctions';

const page = async ({ params }: { params: {category: string, subcategory: string } }) => {
    const {category, subcategory } = params;
    const decodedSubcategory = decodeURIComponent(subcategory) as string;
    const decodedCategory = decodeURIComponent(category) as Category;
    const products = await getProductsBySubcategory( kebabToLowerCase(decodedCategory)as Category, kebabToLowerCase(decodedSubcategory));

    return (

        <div className='p-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-5 w-full place-items-center pb-20'>
            {products.map((product, key) => <ProductCard product={product} key={key} />)}
        </div>

    );
}

export default page