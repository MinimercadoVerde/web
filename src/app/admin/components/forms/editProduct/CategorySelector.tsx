"use client";
import { camelCaseToTitleCase } from "@/globalFunctions";
import { useFormContext } from "react-hook-form";
import { UploadProduct } from "../productResolver";
import { categories } from "@/globalConsts";

const CategorySelector = () => {
  const { register, getValues } = useFormContext<UploadProduct>();

  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select required {...register("category")}>
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {camelCaseToTitleCase(category)}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};

export default CategorySelector;
