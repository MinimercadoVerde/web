'use client'
import { camelCaseToTitleCase } from '@/globalFunctions';
import { Category, Subcategories } from '@/model/product';
import React, { useContext, useState } from 'react'
import { StageContext } from './UploadProductForm';
import { useFormContext } from 'react-hook-form';
import { UploadProduct } from '../productResolver';
import { categories, subcategories } from '../../productConsts';


const CategorySelector = ({ showAt }: { showAt: number }) => {
  const [categorySelected, setCategorySelected] = useState<Category>();
  const { stage, setStage } = useContext(StageContext);
  const { register } = useFormContext<UploadProduct>()

  const handleSubcategoryChange = () => {
    stage === showAt && setStage((stage) => stage + 1)
  }

  return (
    <>
      {
        stage >= showAt &&
        <label >
          <span className='text-sm font-semibold text-gray-600' >Categoría</span>
          <select required autoFocus={stage === showAt}
            {...register("category", { onChange: (e) => setCategorySelected(e.currentTarget.value as Category) })}>
            <option value="" ></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {camelCaseToTitleCase(category)}
              </option>
            ))}
          </select>
        </label >
      }

      {
        categorySelected && stage >= showAt &&
        <label >
          <span className='text-sm font-semibold text-gray-600' >Sub categoría</span>
          <select {...register("subcategory", { onChange: handleSubcategoryChange })} required autoFocus={stage === showAt}>
            <option value="" ></option>
            {subcategories[categorySelected].map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {camelCaseToTitleCase(subcategory)}
              </option>
            ))}
          </select>
        </label>
      }
    </>
  );
};

export default CategorySelector