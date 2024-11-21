'use client'
import './checkout-form.css'
import { yupResolver } from "@hookform/resolvers/yup"
import { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import checkoutSchema, { Checkout } from "./checkoutResolver"
import useCart from '@/app/(main)/components/useCart'
import { formatPrice } from '@/globalFunctions'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { Order, OrderProduct } from '@/model/order'
import { CartProduct, resetCart } from '@/lib/redux/reducers/cart'
import { useRouter } from 'next/navigation'
import ConfirmedOrder from '../ConfirmedOrder'
import { setSessionId, uploadOrder } from '@/lib/mongo/orders'
import { addOrder } from '@/lib/redux/reducers/clientOrders'

const CheckoutForm = () => {
    const dispatch = useAppDispatch()
    const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null)
    const router = useRouter()
    const [stage, setStage] = useState(0)
    const form = useForm({
        resolver: yupResolver(checkoutSchema)
    })

    const { formState } = form
    const items = useAppSelector(state => state.cart.value)
    const { subtotal, itemsCount } = useCart()
    const formContainer = useRef<HTMLDivElement>(null)
    const deliveryFee = 1000

    const validateAndUpload = async (data: FormData) => {
        if (!formState.isValid) return;

        const form = Object.fromEntries(data.entries()) as unknown as Checkout
        const orderProducts: OrderProduct[] = convertCartToOrder(items)

        const order: Order = {
            products: orderProducts,
            customerName: form.name,
            customerPhone: form.phone,
            deliveryAddress: {
                building: form.building,
                apartment: form.apto,
                unit: "Villa verde"
            },
            totalPrice: subtotal + deliveryFee,
            status: "pending",
            createdAt: new Date().toISOString(),
        }
        const upload = await uploadOrder(order)

        if (!upload) return;

        const res = JSON.parse(upload)
        setOrderConfirmed(order);
        dispatch(resetCart());
        dispatch(addOrder({ _id: res.insertedId, ...order }))

    }

    useEffect(() => {
        if (itemsCount !== 0 || orderConfirmed) return;
        setTimeout(() => {
            router.replace('/')
        }, 3000)
    }, [itemsCount])

    useEffect(() => {
        setSessionId()
    }, [])
    return (
        <>
            {
                orderConfirmed ? <ConfirmedOrder order={orderConfirmed} />
                    :
                    itemsCount === 0 ? <div className="text-center font-light my-5">
                        <h1>Tu carrito esta vació</h1>
                        <span className='text-blue-500'>Te dirigiremos a la pagina principal...</span>
                    </div>
                        :
                        <form className="size-full flex flex-col items-center *:my-3 justify-evenly px-5 mx-auto" action={validateAndUpload}>
                            <h1 className="text-center font-medium text-gray-600 ">Datos de tu pedido</h1>
                            <FormProvider {...form}>
                                <div className="flex-grow w-full max-w-lg overflow-hidden scroll-smooth" ref={formContainer}>
                                    <div className="relative snap-center size-full flex flex-col md:flex-row w-full  justify-between items-center *:w-full">
                                        <div >
                                            <Input label='Nombre' name='name' placeholder="Quien recibe el pedido?" autoCapitalize='words' required autoFocus setStage={setStage} />
                                            {stage >= 1 && <UnitSelector setStage={setStage}/>}
                                            <div className="flex gap-3 w-full">
                                                <Input label='Torre' name='building' type='number' inputMode='numeric' required hidden={stage < 2} autoFocus />
                                                <Input label='Apto' name='apto' type='number' inputMode='numeric' required hidden={stage < 2} setStage={setStage} />
                                            </div>
                                            <Input label='Whatsapp' name='phone' type='tel' inputMode='tel' required hidden={stage < 3} autoFocus setStage={setStage} />
                                        </div>
                                    </div>
                                    {
                                        stage >= 4 &&
                                        <div className="snap-center grid place-items-center gap-5 my-5 ">
                                            <div className='text-sm flex gap-3'>
                                                <span>Subtotal: <b>{formatPrice(subtotal)}</b></span>
                                                <b>+</b>
                                                <span>Domicilio: <b>{formatPrice(deliveryFee)}</b></span>
                                            </div>
                                            <div className='text-center text-xl'>
                                                <h2>Total:</h2>
                                                <b>{formatPrice(subtotal + deliveryFee)}</b>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <button type="submit" style={stage >= 4 ? { opacity: 100 } : { opacity: 0 }} className='bg-blue-500 px-5 py-2 rounded-full text-xl text-white disabled:bg-gray-300 my-3' disabled={!formState.isValid} autoFocus>Hacer pedido</button>
                            </FormProvider>
                        </form>
            }
        </>
    )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: keyof Checkout;
    setStage?: Dispatch<SetStateAction<number>>;
}

const Input = ({ label, name, hidden, setStage, onBlur, ...props }: InputProps) => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<Checkout>()
    const valid = getFieldState(name).isDirty && !getFieldState(name).invalid

    const confirmValidity = async () => {
        const valid = await trigger(name)
        if (valid && setStage) setStage((prev) => prev + 1)
    }

    return (
        <>
            {
                !hidden &&
                <label className="relative flex flex-col mb-4 w-full">
                    <input
                        onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                        {...register(name, { onBlur: () => { confirmValidity() } })}
                        {...props}
                        className={`${errors[name] && "input-invalid"} ${valid && "input-valid"} input`}
                    />
                    <div className='flex justify-between w-full'>
                        <span className="font-medium text-gray-400">{label}</span>
                        {errors[name] && <span className="text-xs bottom-0 text-red-500">{errors[name].message}</span>}
                    </div>
                </label>
            }
        </>
    )
}

const UnitSelector = ({setStage}:{setStage: Dispatch<SetStateAction<number>>}) => {
    const { register, formState: { errors }, getFieldState, trigger } = useFormContext<Checkout>()
    const name = 'unit'
    const valid = getFieldState(name).isDirty && !getFieldState(name).invalid

    const confirmValidity = async () => {
        const valid = await trigger(name)
        if (valid && setStage) setStage((prev) => prev + 1)
    }

    return (
        <label htmlFor="" className='w-full relative flex flex-col mb-4' >
            <select
                {...register(name, { onChange: () => { confirmValidity() } })}
                className={`${errors[name] && "input-invalid"} ${valid && "input-valid"} input`}
                autoFocus defaultValue=''>
                <option value='' disabled>En que unidad vives?</option>
                <option value="sendero">Sendero Verde</option>
                <option value="villa">Villa Verde</option>
                <option value="bulevar">Bulevar Verde</option>
            </select>
            <div className='flex justify-between w-full'>
                <span className="font-medium text-gray-400">Unidad</span>
                {errors[name] && <span className="text-xs bottom-0 text-red-500">{errors[name].message}</span>}
            </div>
        </label>
    )
}

function convertCartToOrder(cart: CartProduct[]): OrderProduct[] {
    return cart.map(({
        barcode,
        quantity,
        image,
        name,
        measure,
        brand,
        price,
        category,
        stockStatus
    }) => ({
        barcode,
        image,
        quantity,
        totalPrice: price * quantity,
        unitPrice: price,
        name: `${name} ${measure} - ${brand}`,
        measure,
        category,
        stockStatus
    }));
}
export default CheckoutForm