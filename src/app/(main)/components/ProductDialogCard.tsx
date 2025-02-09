"use client";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  addItem,
  addProduct,
  CartProduct,
  removeItem,
} from "@/lib/redux/reducers/cart";
import { Product } from "@/model/product";
import React, { MouseEventHandler, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowDown, IoIosCloseCircleOutline } from "react-icons/io";

const ProductDialogCard = ({ product }: { product: Product }) => {
  const {
    barcode,
    name,
    price,
    image,
    measure,
    brand,
    category,
    stockStatus,
  } = product;
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
  };

  const labelPrice = formatPrice(price);
  const dialog = useRef<HTMLDialogElement>(null);
  const quantity = useAppSelector((state) =>
    state.cart.value.find((v) => v.barcode === barcode),
  )?.quantity;
  const dispatch = useAppDispatch();

  const closeDialogByBounding: MouseEventHandler = (e) => {
    const dialogDimensions = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.current?.close();
    }
  };

  const remove = () => {
    dispatch(removeItem(barcode));
  };
  const add = () => {
    if (quantity) {
      dispatch(addItem(barcode));
      return;
    }
    dispatch(addProduct(cartProduct));
  };

  return (
    <>
      <button
        className="absolute z-[5] size-full bg-transparent outline-1 outline-transparent focus-visible:outline-blue-600"
        title={name}
        onClick={() => dialog.current?.showModal()}
      />
      <dialog
        ref={dialog}
        className="productDialog"
        onClick={closeDialogByBounding}
      >
        <IoIosCloseCircleOutline
          onClick={() => dialog.current?.close()}
          className="absolute right-0 -translate-y-6 translate-x-6 fill-white text-3xl"
        />

        <div className="relative flex size-full flex-col overflow-hidden rounded-lg px-2 shadow-lg">
          <div className="-z-10">
            { quantity && quantity > 0 &&
            <div className="fixed rounded-b-md bg-green-600 px-3 text-center text-white z-10">
              {`añadido${quantity > 1 ? `s: ${quantity}`: ""}`}
            </div>
            }
            <div className="p-5">
              <ProductImage src={image} alt={name} />
            </div>
            <div className="mb-3">
              <span className="line-clamp-3 mb-1 text-lg font-medium leading-6 text-slate-800">
                {name}
              </span>
              <span className="text-slate-500">{brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="-z-10 text-md text-slate-500 outline-hidden">
                {measure}
              </span>

              <span className="text-nowrap font-semibold text-slate-600">
                {labelPrice}
              </span>
            </div>
          </div>
          <div className="flex h-16 flex-col">
            {/* <Description description={description} /> */}
            <div className="flex w-full grow items-center justify-center gap-5 py-2 text-xl">
              {stockStatus === "out" ? (
                <span className="font-semibold text-red-600">Agotado</span>
              ) : (
                <>
                  <button type="button" onClick={remove} disabled={!quantity}>
                    <FaMinus className="fill-gray-600 active:scale-75" />
                  </button>
                  <div
                    className={`${quantity ? "bg-green-500" : "bg-gray-400"} grid aspect-square w-7 rounded-full`}
                  >
                    <span className="place-self-center font-mono text-xl font-semibold text-white">
                      {quantity || 0}
                    </span>
                  </div>
                  <button type="button" onClick={add}>
                    <FaPlus className="fill-gray-600 active:scale-75" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

const Description = ({ description }: { description: string }) => {
  const [openDescription, setOpenDescription] = useState(false);

  return (
    <>
      <button
        type="button"
        className="peer mx-auto mt-2 flex gap-3 py-2 text-center text-sm text-blue-500"
        onClick={() => {
          setOpenDescription(!openDescription);
        }}
      >
        <span className="font-medium">Detalles</span>
        <IoIosArrowDown
          className={`${!openDescription && "rotate-180"} text-xl`}
        />
      </button>
      <p
        className="absolute right-0 top-0 -z-10 h-[calc(100%-6rem)] overflow-auto bg-white p-5"
        style={{
          translate: `${openDescription ? "none" : "0 100%"}`,
          zIndex: `${openDescription ? "10" : "-10"}`,
          transition: "translate 0.3s ease-in-out",
        }}
      >
        {description}
      </p>
    </>
  );
};

export default ProductDialogCard;