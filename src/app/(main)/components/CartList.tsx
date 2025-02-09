"use client";
import ProductQuantityHandler from "./ProductQuantityHandler";
import { formatPrice } from "@/utils/functions";
import { useAppSelector } from "@/lib/redux/hooks";
import { CartProduct } from "@/lib/redux/reducers/cart";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CgClose } from "react-icons/cg";
import useCart from "./useCart";
import { BiArrowBack } from "react-icons/bi";
import dynamic from "next/dynamic"; 

const LottieAnimation = dynamic(
  () => import("@/components/LottieAddToCartAnimation"),
  { ssr: false },
);

type props = {
  openCartList: boolean;
  setOpenCartList: Dispatch<SetStateAction<boolean>>;
};
const CartList = ({ openCartList, setOpenCartList }: props) => {
  const cartList = useAppSelector((state) => state.cart.value);
  const { subtotal, itemsCount } = useCart();
  return (
    <>
      {openCartList && (
        <div
          className="absolute inset-0 backdrop-blur-xs"
          onClick={() => setOpenCartList(false)}
        />
      )}

      <div
        className={`${openCartList ? "openCart" : "closeCart"} z-20 flex flex-col place-items-center items-center bg-gray-50`}
        id="cartList"
      >
        <div className="flex w-full justify-between border-b px-3 py-1 font-semibold text-gray-600">
          <span>Tu canasta</span>
          <button
            className="flex items-center gap-2 font-normal"
            onClick={() => setOpenCartList(false)}
          >
            Cerrar <CgClose />
          </button>
        </div>
        {itemsCount === 0 ? (
          <div className="flex h-full w-max max-w-md flex-col items-center justify-evenly">
            <span>Tu canasta esta vacía</span>
            <figure className="w-full min-w-10">
              <LottieAnimation />
            </figure>
            <button
              className="flex items-center gap-3 text-blue-600"
              onClick={() => setOpenCartList(false)}
            >
              <BiArrowBack className="rotate-90" /> Añade productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex w-full grow flex-col overflow-auto">
              {cartList.map((product) => (
                <ProductListItem product={product} key={product.barcode} />
              ))}
            </div>

            <div className="flex w-full items-center gap-5 p-3 text-center text-lg">
              <span className="w-1/2 text-gray-600">
                Subtotal:{" "}
                <b className="text-gray-900">{formatPrice(subtotal)}</b>
              </span>
              <Link
                href="/checkout"
                onClick={() => setOpenCartList(false)}
                className="mx-auto w-fit self-center rounded-full bg-blue-500 px-3 py-1 font-medium text-white"
              >
                Revisar y pedir
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
const ProductListItem = ({ product }: { product: CartProduct }) => {
  const { barcode, quantity, image, name, price } = product;

  return (
    <div className="flex w-full items-center justify-between gap-5 border-y p-2">
      <figure className="relative aspect-square w-16">
        <CldImage
          src={image}
          fill
          alt={`${name} ${price}`}
          className="object-cover"
        />
      </figure>
      <div className="flex w-60 grow flex-col">
        <span>{name}</span>
        <span className="text-xs text-gray-600">{formatPrice(price)} c/u</span>
        <span className="font-semibold">{formatPrice(price * quantity)}</span>
      </div>
      <ProductQuantityHandler barcode={barcode} quantity={quantity} />
    </div>
  );
};

export default CartList;
