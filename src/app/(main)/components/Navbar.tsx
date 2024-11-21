// This component will be used in future versions of the application

'use client'
import { MdFavoriteBorder, MdOutlineHistory } from "react-icons/md"
import CartList from "./CartList"
import { BsCart4 } from "react-icons/bs"
import { useState } from "react"
import Link from "next/link"
import useCart from "./useCart"

const Navbar = () => {
    const [openCartList, setOpenCartList] = useState(false)
    const {itemsCount} = useCart()
    
    return   (
        <nav className='relative z-10 flex'>
            <CartList openCartList={openCartList} setOpenCartList={setOpenCartList} />
            <div className="flex justify-between text-5xl bg-white text-gray-800 p-4 lg:p-5 lg:flex-col lg:justify-around w-full">
                <Link href="/favorites">
                    <MdFavoriteBorder />
                </Link>
                <Link href="/recent">
                    <MdOutlineHistory />
                </Link>
                <section className='relative' onClick={() => setOpenCartList(!openCartList)}>
                    <div className='absolute right-0 rounded-full w-7 aspect-square bg-blue-500 grid place-items-center'>
                        <b className='text-lg font-mono text-white'>{itemsCount}</b>
                    </div>
                    <BsCart4 />
                </section>
            </div>
        </nav>
    )
}

export default Navbar