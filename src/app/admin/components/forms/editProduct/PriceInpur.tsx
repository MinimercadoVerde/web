import React, { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Product } from '@/model/product'

const PriceInput = () => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<Product>()
    const [value, setValue] = useState("");
    const valid = getFieldState("price").isDirty && !getFieldState("price").invalid

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
            <label htmlFor="price" className='text-sm font-semibold text-gray-600'>Precio</label>

            <input
                id="price"
                type='number'
                inputMode='numeric'
                onInput={onInput}
                onKeyDown={handleClickEnter}
                {...register("price", { onChange: () => trigger("price") })}
                min={50}
                step={50}
                className={`${errors["price"] && "input-invalid"} ${valid && "input-valid"} input flex justify-between peer`} required
            />
            <span className='absolute right-20 top-0 text-green-600 peer-invalid:text-red-500'>{value}</span>


            {errors["price"] && <span className="absolute bottom-0 text-xs font-semibold text-red-500">{errors["price"]?.message}</span>}
        </div>

    )
}

export default PriceInput