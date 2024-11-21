import { Order } from '@/model/order'
import React from 'react'
import ProductImage from '@/components/ProductImage'
import { formatPrice } from '@/globalFunctions'
import { WhatsappIcon } from '@/assets/icons/whatsappLogo'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const ConfirmedOrder = ({ order }: { order: Order | null }) => {
    return (
        <>
            {
                order && <div className='w-full flex flex-col items-center justify-center pb-24'>
                    <div className="text-center font-light my-10 text-xl">
                        <h1>Gracia por tu compra </h1>
                        <span className='text-blue-500'>Tu pedido será entregado pronto...</span>
                    </div>

                    <div className='px-3 *:my-5'>
                        <h2 className='text-center my-1'>Resumen del pedido</h2>
                        <h3 className='text-center'>Total: <b>{formatPrice(order.totalPrice)}</b></h3>
                        <div className='flex items-center justify-between'>

                            <div className='flex flex-col gap-3'>

                                <span>Cliente: <b>{order.customerName}</b></span>
                                <div className='flex gap-5'>
                                    <span>T: <b>{order.deliveryAddress.building}</b></span>
                                    <span>Apto: <b>{order.deliveryAddress.building}</b></span>
                                </div>
                                <span>Teléfono: <b>{order.customerPhone}</b></span>
                            </div>
                            <div className='flex flex-col items-center max-w-32 text-center text-xs gap-1'>
                                <span >Contáctenos </span>

                                <Link href="http://api.whatsapp.com/send?phone=573145328229&text=quieroalgo" className='flex flex-col items-center'>
                                    <WhatsappIcon className='text-3xl' />
                                    <span>312 345 7890</span>
                                </Link>
                            </div>
                        </div>

                        <ul className=''>
                            {
                                order.products.map((product) => (
                                    <li key={product.barcode} className='flex gap-5 items-center py-1 border-b-2 first:border-t-2 border-gray-300  justify-between'>

                                        <div className='flex gap-4 items-center'>
                                            <div className='w-16'>
                                                <ProductImage src={product.image} alt={product.name} />
                                            </div>
                                            <div className='flex flex-col items-start text-left'>
                                                <span className='leading-4'>{product.name}</span>
                                                <span className='text-xs mt-2'>{formatPrice(product.unitPrice)} c/u
                                                    <b className='mx-2'> {formatPrice(product.totalPrice)}</b></span>
                                            </div>
                                        </div>
                                        <div className='bg-green-500 w-7 text-center rounded-full text-white'>
                                            <span className='text-xl font-mono'>{product.quantity}</span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div >
            }
        </>

    )
}
const BackHomeButton = () => {
    return (
        <Link href='/' className=''>
            <button className='bg-blue-500 px-5 py-2 rounded-full text-xl text-white'>Volver al inicio</button>
        </Link>
    )
}

export default ConfirmedOrder