import { getProductsBySubcategory } from '@/lib/mongo/products'
import { Category, SubCategory } from '@/model/product'
import React from 'react'
import ProductCard from '../../components/ProductCard';

const page = async ({ params }: { params: {  subcategory: SubCategory<Category> } }) => {
    const { subcategory } = params;
    const decodedSubcategory = decodeURIComponent(subcategory) as SubCategory<Category>;
    const products = await getProductsBySubcategory(decodedSubcategory);

    return (

        <div className='p-2 grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-5 w-full place-items-center'>
            {products.map((product, key) => <ProductCard product={product} key={key} />)}
        </div>

    );
}

export default page