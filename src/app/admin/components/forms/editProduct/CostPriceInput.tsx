import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Product } from '@/model/product'

const CostPriceInput = () => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<Product>()
    const [value, setValue] = useState("");
    const valid = getFieldState("costPrice").isDirty && !getFieldState("costPrice").invalid

    const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const number = Number(e.target.value)
        if (isNaN(number)) return;
        setValue(number.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }))
    }

    const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key != 'Enter') return;
        e.currentTarget.blur();
    }

    return (

        <div className="relative input-group pb-4 flex flex-col ">
            <label htmlFor="costPrice" className='text-sm font-semibold text-gray-600'>Costo</label>

            <input
                id="costPrice"
                type='number'
                inputMode='numeric'
                onInput={onInput}
                onKeyDown={handleClickEnter}
                {...register("costPrice", { onChange: () => trigger("costPrice") })}
                min={50}
                className={`${errors["costPrice"] && "input-invalid"} ${valid && "input-valid"} input flex justify-between peer`} required
            />
            <span className='absolute right-20 top-0 text-green-600 peer-invalid:text-red-500'>{value}</span>


            {errors["costPrice"] && <span className="absolute bottom-0 text-xs font-semibold text-red-500">{errors["costPrice"]?.message}</span>}
        </div>

    )
}

export default CostPriceInput