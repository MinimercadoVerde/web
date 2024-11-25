'use client'
import ProductImage from '@/components/ProductImage'
import { formatPrice } from '@/globalFunctions'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { addItem, addProduct, CartProduct, removeItem } from '@/lib/redux/reducers/cart'
import { Product } from '@/model/product'
import React, { MouseEventHandler, useRef, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { IoIosArrowDown, IoIosCloseCircleOutline } from 'react-icons/io'

const ProductDialogCard = ({ product }: { product: Product }) => {
    const { barcode, name, price, description, image, measure, brand, category, stockStatus } = product
    const cartProduct: CartProduct = {
        barcode,
        name,
        price,
        brand,
        image,
        category,
        measure,
        stockStatus,
        quantity: 1,
    }

    const labelPrice = formatPrice(price)
    const dialog = useRef<HTMLDialogElement>(null)
    const quantity = useAppSelector(state => state.cart.value.find((v) => v.barcode === barcode))?.quantity
    const dispatch = useAppDispatch()

    const closeDialogByBounding: MouseEventHandler = (e) => {
        const dialogDimensions = e.currentTarget.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            dialog.current?.close()
        }
    }

    const remove = () => {
        dispatch(removeItem(barcode))
    }
    const add = () => {
        if (quantity) { dispatch(addItem(barcode)); return }
        dispatch(addProduct(cartProduct))
    }

    return (
        <>
            <button className="size-full absolute z-10 bg-transparent outline-1 outline-blue-600" title={name} onClick={() => dialog.current?.showModal()} />
            <dialog ref={dialog} className="productDialog" onClick={closeDialogByBounding}>
                <IoIosCloseCircleOutline onClick={() => dialog.current?.close()} className="absolute text-3xl right-0 translate-x-6 -translate-y-6 fill-white" />

                <div className="relative flex flex-col  size-full  shadow-lg px-2 rounded-lg overflow-hidden">
                    <div className='-z-10'>
                        <div className='p-5'>
                            <ProductImage src={image} alt={name} />
                        </div>
                        <div className='my-2'>
                            <span className='line-clamp-3 text-lg leading-6 text-slate-800 font-medium'>
                                {name}
                            </span>
                            <span className='text-slate-500'>{brand}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span className="-z-10 outline-none text-slate-500 text-sm">{measure}</span>
                            <span className="font-semibold text-nowrap text-slate-600">{labelPrice}</span>
                        </div>
                    </div>
                    <div className='h-24 flex flex-col   bg-white'>

                        {/* <Description description={description} /> */}
                        <div className=" flex-grow w-full flex gap-5 items-center justify-center py-2 text-xl">
                            {
                                stockStatus === 'out' ? 
                                <span className="text-red-600 font-semibold">Agotado</span> 
                                :
                                    <>
                                        <button type='button' onClick={remove} disabled={!quantity}><FaMinus className="fill-gray-600 active:scale-75 " /></button>
                                        <div className={`${quantity ? 'bg-green-500' : 'bg-gray-400'} aspect-square w-7  grid rounded-full`}>
                                            <span className="text-xl font-semibold font-mono place-self-center text-white">{quantity || 0}</span>
                                        </div>
                                        <button type='button' onClick={add}><FaPlus className="fill-gray-600 active:scale-75" /></button>
                                    </>
                            }
                        </div>

                    </div>
                </div>
            </dialog>
        </>)
}

const Description = ({ description }: { description: string }) => {
    const [openDescription, setOpenDescription] = useState(false)

    return (
        <>
            <button type="button" className=" py-2 flex gap-3 text-sm text-blue-500 text-center peer mx-auto mt-2" onClick={() => { setOpenDescription(!openDescription) }}>
                <span className="font-medium">
                    Detalles
                </span>
                <IoIosArrowDown className={`${!openDescription && "rotate-180"} text-xl`} />
            </button>
            <p className='-z-10 p-5 absolute top-0 right-0 bg-white h-[calc(100%-6rem)] overflow-auto' style={{ translate: `${openDescription ? "none" : "0 100%"}`, zIndex: `${openDescription ? "10" : "-10"}`, transition: "translate 0.3s ease-in-out" }}>
                {description}
            </p>

        </>
    )
}

export default ProductDialogCard