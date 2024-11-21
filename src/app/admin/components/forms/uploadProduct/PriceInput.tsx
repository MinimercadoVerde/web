import React, { ChangeEventHandler, KeyboardEventHandler, useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { StageContext } from './UploadProductForm'
import { UploadProduct } from '../productResolver'
import { formatPrice } from '@/globalFunctions'

const PriceInput = ({ showAt }: { showAt: number }) => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<UploadProduct>()
    const { stage, setStage } = useContext(StageContext)
    const [value, setValue] = useState("");
    const valid = getFieldState("price").isDirty && !getFieldState("price").invalid

    const onInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const number = Number(e.target.value)
        if (isNaN(number)) return;
        setValue(formatPrice(number))
    }

    const handleClickEnter: KeyboardEventHandler<HTMLInputElement> = async(e) => {
        if (e.key != 'Enter') return;
        e.currentTarget.blur(); 
    }
    const onBlur = async() => {
        await trigger("price");
        if (!(stage === showAt) || stage === 0 || getFieldState("price").invalid) return;
        setStage((stage) => stage + 1)
    }
    
    return (
        <>
            {stage >= showAt &&
                <div className="relative input-group pb-4 flex flex-col ">
                    <label htmlFor="price" className='text-sm font-semibold text-gray-600'>Precio</label>

                    <input
                        id="price"
                        type='number'
                        inputMode='numeric'
                        onInput={onInput}
                        onKeyDown={handleClickEnter}
                        {...register("price", {onBlur: onBlur, onChange: ()=>trigger("price")  })}
                        min={50}
                        step={50}
                        autoFocus={stage === showAt}
                        className={`${errors["price"] && "input-invalid"} ${valid && "input-valid"} input flex justify-between peer`} required
                    />
                    <span className='absolute right-20 top-0 text-green-600 peer-invalid:text-red-500'>{value}</span>


                    {errors["price"] && <span className="absolute bottom-0 text-xs font-semibold text-red-500">{errors["price"]?.message}</span>}
                </div>
            }

        </>
    )
}

export default PriceInput