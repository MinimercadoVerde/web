"use client";
import { camelCaseToTitleCase, formatPrice } from "@/utils/functions";
import { setAllowedToShopOvertime } from "@/lib/actions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getInitialOrders } from "@/lib/redux/reducers/clientOrders";
import { Order } from "@/model/order";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdDeliveryDining } from "react-icons/md";

const OrderInProgress = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.clientOrders);

  useLayoutEffect(() => {
    dispatch(getInitialOrders());
    setAllowedToShopOvertime();
  }, [dispatch]);

  const dialog = useRef<HTMLDialogElement>(null);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {orders.length > 0 && (
        <div className="relative z-10 select-none rounded-full bg-green-200 p-1 text-5xl text-green-800">
          <div className="absolute left-0 aspect-square w-5 rounded-full bg-blue-600 text-center font-mono text-sm text-white">
            {orders.length}
          </div>
          <MdDeliveryDining onClick={() => setOpenModal((v) => !v)} />
          <dialog
            open={openModal}
            ref={dialog}
            className="mt-3 min-w-60 text-base shadow-md"
          >
            <div className="flex w-full justify-between border-b px-3 py-1 text-sm font-semibold text-gray-600">
              <span>{orders.length > 1 ? "Tus pedidos" : "Tu pedido"}</span>
              <button
                className="flex items-center gap-2 font-normal"
                onClick={() => setOpenModal(false)}
              >
                Cerrar <CgClose />
              </button>
            </div>
            {orders.map((order, index) => (
              <OrderListItem
                order={order}
                closeDialog={() => setOpenModal(false)}
                key={index}
              />
            ))}
          </dialog>
        </div>
      )}
    </>
  );
};
const OrderListItem = ({
  order,
  closeDialog,
}: {
  order: Order;
  closeDialog: () => void;
}) => {
  const {
    deliveryAddress: { unit, apartment, building },
    subtotal,
    deliveryFee,
    status,
    _id,
  } = order;
  const estado = {
    pending: "en progreso...",
    packed: "en camino...",
    delivered: "entregado",
  };
  const totalPrice = deliveryFee + subtotal;
  return (
    <Link
      href={`/order/${_id}`}
      className="flex flex-col items-center border border-gray-100 p-2 pb-1 text-lg text-gray-700"
      onClick={closeDialog}
    >
      <div className="text-xs justify-between w-full flex">
        <span className="text-sm">{camelCaseToTitleCase(`${unit} verde`)}</span>
      <span className=" font-light text-blue-400">{estado[status]}</span>
      </div>
      <div className="flex w-full items-center justify-between gap-10">
        <span className="flex justify-between gap-5 text-nowrap font-light">
          <span>
            T<b>{building}</b>
          </span>
          <span>
            AP <b>{apartment}</b>
          </span>
        </span>
        <span className="text-base">{formatPrice(totalPrice)}</span>
      </div>
    </Link>
  );
};

export default OrderInProgress;
