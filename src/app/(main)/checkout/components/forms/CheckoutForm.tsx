"use client";
import "./checkout-form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import checkoutSchema, { Checkout } from "./checkoutResolver";
import useCart from "@/app/(main)/components/useCart";
import {
  camelCaseToTitleCase,
  formatPrice,
} from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Order, OrderProduct } from "@/model/order";
import { CartProduct, resetCart } from "@/lib/redux/reducers/cart";
import { useRouter } from "next/navigation";
import ConfirmedOrder from "../ConfirmedOrder";
import { setSessionId, uploadOrder } from "@/lib/mongo/orders";
import { addOrder } from "@/lib/redux/reducers/clientOrders";
import { deliveryFees } from "@/utils/consts";

const CheckoutForm = () => {
  const dispatch = useAppDispatch();
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(1500);

  const form = useForm({
    resolver: yupResolver(checkoutSchema),
  });

  const { formState, handleSubmit, getValues } = form;
  const items = useAppSelector((state) => state.cart.value);
  const { subtotal, itemsCount } = useCart();
  const formContainer = useRef<HTMLDivElement>(null);

  const validateAndUpload = async () => {
    if (!formState.isValid) return;
    const form: Checkout = getValues()
    const { name, phone, building, apto, unit } = form;
    setDeliveryFee(deliveryFees[unit]);
    const products: OrderProduct[] = convertCartToOrder(items);

    const order: Order = {
      products,
      customerName: camelCaseToTitleCase(name),
      customerPhone: phone,
      deliveryAddress: {
        building: building,
        apartment: apto,
        unit: unit,
      },
      subtotal,
      deliveryFee: deliveryFee,
      status: "pending",
    };

    const upload = await uploadOrder(order);

    if (!upload) return;

    const res = JSON.parse(upload);
    setOrderConfirmed(order);
    dispatch(resetCart());
    dispatch(addOrder({ ...order, _id: res.insertedId }));
  };

  useEffect(() => {
    if (itemsCount !== 0 || orderConfirmed) return;
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }, [itemsCount]);

  useEffect(() => {
    setSessionId();
  }, []);
  return (
    <>
      {orderConfirmed ? (
        <ConfirmedOrder order={orderConfirmed} />
      ) : itemsCount === 0 ? (
        <div className="my-5 text-center font-light">
          <h1>Tu carrito esta vació</h1>
          <span className="text-blue-500">
            Te dirigiremos a la pagina principal...
          </span>
        </div>
      ) : (
        <form
          className="mx-auto flex size-full flex-col items-center justify-evenly px-5 *:my-3"
          onSubmit={handleSubmit(validateAndUpload)}
        >
          <h1 className="text-center font-medium text-gray-600">
            Datos de tu pedido
          </h1>
          <FormProvider {...form}>
            <div
              className="w-full max-w-lg grow overflow-hidden scroll-smooth"
              ref={formContainer}
            >
              <div className="relative flex size-full w-full snap-center flex-col items-center justify-between *:w-full md:flex-row">
                <div>
                  <Input
                    label="Nombre"
                    name="name"
                    placeholder="Quien recibe el pedido?"
                    autoCapitalize="words"
                    required
                    autoFocus
                    setStage={setStage}
                  />
                  {stage >= 1 && <UnitSelector setStage={setStage} />}
                  <div className="flex w-full gap-3">
                    <Input
                      label="Torre"
                      name="building"
                      type="number"
                      inputMode="numeric"
                      required
                      hidden={stage < 2}
                      autoFocus
                    />
                    <Input
                      label="Apto"
                      name="apto"
                      type="number"
                      inputMode="numeric"
                      required
                      hidden={stage < 2}
                      setStage={setStage}
                    />
                  </div>
                  <Input
                    label="Whatsapp"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    hidden={stage < 3}
                    autoFocus
                    setStage={setStage}
                  />
                </div>
              </div>
              {stage >= 4 && (
                <div className="my-5 grid snap-center place-items-center gap-5">
                  <div className="flex gap-3 text-sm">
                    <span>
                      Subtotal: <b>{formatPrice(subtotal)}</b>
                    </span>
                    <b>+</b>
                    <span>
                      Domicilio: <b>{formatPrice(deliveryFee)}</b>
                    </span>
                  </div>
                  <div className="text-center text-xl">
                    <h2>Total:</h2>
                    <b>{formatPrice(subtotal + deliveryFee)}</b>
                  </div>
                </div>
              )}
            </div>
            {stage < 4 && (
              <button
                className="rounded-full bg-white px-5 py-2 text-lg shadow-xs"
                type="button"
              >
                Siguiente
              </button>
            )}
            <button
              type="submit"
              style={stage >= 4 ? { opacity: 100 } : { opacity: 0 }}
              className="my-3 rounded-full bg-blue-500 px-5 py-2 text-xl text-white disabled:bg-gray-300"
              disabled={!formState.isValid || formState.isSubmitting}
              autoFocus
              
            >
              Hacer pedido
            </button>
          </FormProvider>
        </form>
      )}
    </>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof Checkout;
  setStage?: Dispatch<SetStateAction<number>>;
}

const Input = ({
  label,
  name,
  hidden,
  setStage,
  onBlur,
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
    getFieldState,
    trigger,
  } = useFormContext<Checkout>();
  const valid = getFieldState(name).isDirty && !getFieldState(name).invalid;

  const confirmValidity = async () => {
    const valid = await trigger(name);
    if (valid && setStage) setStage((prev) => prev + 1);
  };

  return (
    <>
      {!hidden && (
        <label className="relative mb-4 flex w-full flex-col">
          <input
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            {...register(name, {
              onBlur: () => {
                confirmValidity();
              },
            })}
            {...props}
            className={`${errors[name] && "input-invalid"} ${valid && "input-valid"} input`}
          />
          <div className="flex w-full justify-between">
            <span className="font-medium text-gray-400">{label}</span>
            {errors[name] && (
              <span className="bottom-0 text-xs text-red-500">
                {errors[name].message}
              </span>
            )}
          </div>
        </label>
      )}
    </>
  );
};

const UnitSelector = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<number>>;
}) => {
  const {
    register,
    formState: { errors },
    getFieldState,
    trigger,
  } = useFormContext<Checkout>();
  const name = "unit";
  const valid = getFieldState(name).isDirty && !getFieldState(name).invalid;

  const confirmValidity = async () => {
    const valid = await trigger(name);
    if (valid && setStage) setStage((prev) => prev + 1);
  };

  return (
    <label htmlFor="" className="relative mb-4 flex w-full flex-col">
      <select
        {...register(name, {
          onChange: () => {
            confirmValidity();
          },
        })}
        className={`${errors[name] && "input-invalid"} ${valid && "input-valid"} input`}
        autoFocus
        defaultValue=""
      >
        <option value="" disabled>
          En que unidad vives?
        </option>
        <option value="sendero">Sendero Verde</option>
        <option value="villa">Villa Verde</option>
        <option value="bulevar">Bulevar Verde</option>
      </select>
      <div className="flex w-full justify-between">
        <span className="font-medium text-gray-400">Unidad</span>
        {errors[name] && (
          <span className="bottom-0 text-xs text-red-500">
            {errors[name].message}
          </span>
        )}
      </div>
    </label>
  );
};

function convertCartToOrder(cart: CartProduct[]): OrderProduct[] {
  return cart.map(
    ({
      barcode,
      quantity,
      image,
      name,
      measure,
      brand,
      price,
      category,
      stockStatus,
    }) => ({
      barcode: Number(barcode),
      image,
      quantity: Number(quantity),
      totalPrice: Number(price * quantity),
      unitPrice: Number(price),
      name: `${name} ${measure} - ${brand}`,
      measure,
      category,
      stockStatus,
    }),
  );
}
export default CheckoutForm;
