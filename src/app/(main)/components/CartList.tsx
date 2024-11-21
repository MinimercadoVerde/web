'use client'
import ProductQuantityHandler from './ProductQuantityHandler';
import { formatPrice } from '@/globalFunctions';
import { useAppSelector } from '@/lib/redux/hooks';
import { CartProduct, } from '@/lib/redux/reducers/cart';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { CgClose, } from 'react-icons/cg';
import useCart from './useCart';
import animationData from "@/assets/add-product.json";
import Lottie from 'lottie-react';
import { BiArrowBack } from 'react-icons/bi';

type props = { openCartList: boolean; setOpenCartList: Dispatch<SetStateAction<boolean>>; }
const CartList = ({ openCartList, setOpenCartList }: props) => {

    const cartList = useAppSelector(state => state.cart.value)
    const { subtotal, itemsCount } = useCart()
    return (
        <>

            {
                openCartList && <div className='absolute inset-0 backdrop-blur-sm ' onClick={() => setOpenCartList(false)} />
            }

            <div className={`${openCartList ? "openCart" : "closeCart"} z-20 max-w-md bg-gray-50 flex flex-col items-center place-items-center`} id='cartList'>
                <div className='flex justify-between border-b  text-gray-600 font-semibold w-full py-1 px-3 '>
                    <span>Tu canasta</span>
                    <button className='flex items-center gap-2 font-normal' onClick={() => setOpenCartList(false)}>
                        Cerrar <CgClose /></button>
                </div>
                {
                    itemsCount === 0 ?
                        <div className='w-max max-w-md h-full flex flex-col justify-evenly items-center'>
                            <span>Tu canasta esta vacía</span>
                            <Lottie animationData={animationData} style={{maxWidth: "20rem"}}/>
                            <button className='flex text-blue-600 items-center gap-3' onClick={() => setOpenCartList(false)}><BiArrowBack className='rotate-90'/> Añade productos</button>
                        </div>
                        :
                        <>
                            <div className='w-full flex-grow overflow-auto flex flex-col'>
                                {cartList.map((product) => (<ProductListItem product={product} key={product.barcode} />))}
                            </div>

                            <div className='flex items-center gap-5 p-3 w-full text-lg text-center'>
                                <span className='w-1/2 text-gray-600'>Subtotal: <b className='text-gray-900'>{formatPrice(subtotal)}</b></span>
                                <Link href='/checkout' onClick={() => setOpenCartList(false)}
                                    className='bg-blue-500 mx-auto text-white w-fit px-3 py-1 rounded-full self-center font-medium'
                                >Revisar y pedir</Link>
                            </div>
                        </>
                }
            </div>

        </>

    )
}
const ProductListItem = ({ product }: { product: CartProduct }) => {
    const { barcode, quantity, image, name, price } = product;

    return (

        <div className='flex justify-between items-center border-y p-2 w-full gap-5'>
            <figure className='relative w-16 aspect-square'>
                <CldImage src={image} fill alt={`${name} ${price}`} className='object-cover' />
            </figure>
            <div className=' flex-grow flex flex-col w-60'>
                <span>{name}</span>
                <span className='text-xs text-gray-600'>
                    {formatPrice(price)} c/u</span>
                <span className='font-semibold'>{formatPrice(price * quantity)}</span>
            </div>
            <ProductQuantityHandler barcode={barcode} quantity={quantity} />
        </div >
    )
}

export default CartList