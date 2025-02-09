"use client";
import { camelCaseToTitleCase } from "@/utils/functions";
import { Category } from "@/model/product";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploadProduct } from "../productResolver";
import { categories, subcategories } from "@/utils/consts";
import TagsInput from "./TagsInput";

const CategorySelector = () => {
  const [categorySelected, setCategorySelected] = useState<Category>("otra");
  const { register, control } = useFormContext<UploadProduct>();

  return (
    <>
      <label>
        <span className="text-sm font-semibold text-gray-600">Categoría</span>
        <select
          {...register("category", {
            onChange: (e) =>
              setCategorySelected(e.currentTarget.value as Category),
          })}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {camelCaseToTitleCase(category)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span className="text-sm font-semibold text-gray-600">
          Sub categoría
        </span>
        <select {...register("subcategory")}>
          <option value=""></option>
          {subcategories[categorySelected]?.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {camelCaseToTitleCase(subcategory)}
            </option>
          ))}
        </select>
      </label>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <TagsInput category={categorySelected} {...field} />
        )}
      />
    </>
  );
};

export default CategorySelector;
