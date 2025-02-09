"use client";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/utils/functions";

import { Product } from "@/model/product";
import React, { MouseEventHandler, useRef} from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ProductDialogCard = ({ product }: { product: Product }) => {
  const {
    name,
    price,
    image,
    measure,
    brand,
    stockStatus,
  } = product;

  const labelPrice = formatPrice(price);
  const dialog = useRef<HTMLDialogElement>(null);

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

  const stockStatusColor = {
    out: "#ef4444",
    low: "#fbbf24",
    available: "#22c55e",
    none: "transparent",
  };

  const changeStatusButtons = {
    low: {
      label: "Bajo Stock",
      color: "blue-500",
    },
    available: {
      label: "Disponible",
      color: "blue-500",
    },
    out: {
      label: "Agotado",
      color: "red-400",
    },
  };

  return (
    <>
      <button
        className="absolute z-10 size-full bg-transparent outline-1 outline-transparent focus-visible:outline-blue-600"
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

        <div
          className="relative flex size-full flex-col overflow-hidden rounded-lg border-4 px-2 shadow-lg"
          style={{ borderColor: stockStatusColor[stockStatus] }}
        >
          <div className="-z-10">
            <div className="p-5">
              <ProductImage src={image} alt={name} />
            </div>
            <div className="mb-2">
              <span className="line-clamp-3 text-lg font-medium leading-6 text-slate-800">
                {name}
              </span>
              <span className="text-slate-500">{brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="-z-10 text-sm text-slate-500 outline-hidden">
                {measure}
              </span>

              <span className="text-nowrap font-semibold text-slate-600">
                {labelPrice}
              </span>
            </div>
          </div>
          <div className="grid grid-flow-row justify-center gap-3 py-5">
            {Object.keys(changeStatusButtons).map((val) => {
              const value = val as keyof typeof changeStatusButtons;
              if (val === stockStatus) return;

              const { label } = changeStatusButtons[value];
              const color = stockStatusColor[value];

              return (
                <button className=" self-center px-10"
                style={{backgroundColor: color}}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
};

// const Description = ({ description }: { description: string }) => {
//   const [openDescription, setOpenDescription] = useState(false);

//   return (
//     <>
//       <button
//         type="button"
//         className="peer mx-auto mt-2 flex gap-3 py-2 text-center text-sm text-blue-500"
//         onClick={() => {
//           setOpenDescription(!openDescription);
//         }}
//       >
//         <span className="font-medium">Detalles</span>
//         <IoIosArrowDown
//           className={`${!openDescription && "rotate-180"} text-xl`}
//         />
//       </button>
//       <p
//         className="absolute right-0 top-0 -z-10 h-[calc(100%-6rem)] overflow-auto bg-white p-5"
//         style={{
//           translate: `${openDescription ? "none" : "0 100%"}`,
//           zIndex: `${openDescription ? "10" : "-10"}`,
//           transition: "translate 0.3s ease-in-out",
//         }}
//       >
//         {description}
//       </p>
//     </>
//   );
// };

export default ProductDialogCard;
