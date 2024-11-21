'use client'
import { formatPrice } from "@/globalFunctions"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { getInitialOrders } from "@/lib/redux/reducers/clientOrders"
import { Order } from "@/model/order"
import Link from "next/link"
import { useLayoutEffect, useRef, useState } from "react"
import { CgClose } from "react-icons/cg"
import { MdDeliveryDining } from "react-icons/md"

const OrderInProgress = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(state => state.clientOrders)
    
    useLayoutEffect(() => {
       dispatch(getInitialOrders())
    }, [dispatch])

    const dialog = useRef<HTMLDialogElement>(null)
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            {
                orders.length > 0 &&
                < div className="z-10 relative p-1 text-5xl bg-green-200 rounded-full text-green-800 select-none" >
                    <div className="absolute left-0 font-mono rounded-full text-center text-sm text-white w-5 aspect-square bg-blue-600">
                        {orders.length}
                    </div>
                    <MdDeliveryDining onClick={() => setOpenModal(v => !v)} />
                    <dialog open={openModal} ref={dialog} className="shadow-md mt-3 text-base min-w-60">
                        <div className='flex justify-between border-b  text-gray-600 font-semibold w-full py-1 px-3 text-sm '>
                            <span>{orders.length > 1 ? "Tus pedidos" : "Tu pedido"}</span>
                            <button className='flex items-center gap-2 font-normal' onClick={() => setOpenModal(false)}>
                                Cerrar <CgClose /></button>
                        </div>
                        {
                            orders.map((order, index) => <OrderListItem order={order} closeDialog={() => setOpenModal(false)} key={index} />)
                        }
                    </dialog>
                </div >
            }
        </>
    )
}
const OrderListItem = ({ order, closeDialog }: { order: Order, closeDialog: () => void }) => {
    const { deliveryAddress: { apartment, building }, totalPrice, _id } = order

    return (
        <Link href={`/order/${_id}`} className="flex flex-col p-2 pb-1 items-center border border-gray-100 text-gray-700 text-lg " onClick={closeDialog}>
            <div className="flex justify-between w-full items-center gap-10 ">
                <span className="font-light flex gap-5 justify-between text-nowrap">
                    <span>T<b>{building}</b></span>
                    <span>AP <b>{apartment}</b></span>
                </span>
                <span className="text-base">{formatPrice(totalPrice)}</span>
            </div>
            <span className="text-xs font-light text-blue-400">En progreso...</span>
        </Link>
    )
}

export default OrderInProgress