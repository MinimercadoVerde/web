'use client'
import { camelCaseToTitleCase } from '@/globalFunctions';
import { Category } from '@/model/product';
import React, { useContext, useState } from 'react'
import { StageContext } from './UploadProductForm';
import { useFormContext } from 'react-hook-form';
import { UploadProduct } from '../productResolver';
import { categories } from '@/globalConsts';

const CategorySelector = ({ showAt }: { showAt: number }) => {
  const { stage, setStage } = useContext(StageContext);
  const { register } = useFormContext<UploadProduct>()

  return (
    <>
      {
        stage >= showAt &&
        <label >
          <span className='text-sm font-semibold text-gray-600' >Categoría</span>
          <select required autoFocus={stage === showAt}
            {...register("category")}>
            <option value="" ></option>
            { categories.map((category) => (
              <option key={category} value={category}>
                {camelCaseToTitleCase(category)}
              </option>
            ))}
          </select>
        </label >
      }

    </>
  );
};

export default CategorySelector