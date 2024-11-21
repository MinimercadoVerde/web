'use client'
import { camelCaseToTitleCase } from '@/globalFunctions';
import { Category } from '@/model/product';
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { UploadProduct } from '../productResolver';
import { categories, subcategories } from '../../productConsts';


const CategorySelector = () => {
    const { register, getValues } = useFormContext<UploadProduct>()

    return (
        <>
            <label >
                <span className='text-sm font-semibold text-gray-600' >Categoría</span>
                <select required
                    {...register("category")}>
                    <option value="" ></option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {camelCaseToTitleCase(category)}
                        </option>
                    ))}
                </select>
            </label >

            <label >
                <span className='text-sm font-semibold text-gray-600' >Sub categoría</span>
                <select {...register("subcategory")} required>
                    <option value="" ></option>
                    {subcategories[getValues("category")].map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                            {camelCaseToTitleCase(subcategory)}
                        </option>
                    ))}
                </select>
            </label>

        </>
    );
};

export default CategorySelector