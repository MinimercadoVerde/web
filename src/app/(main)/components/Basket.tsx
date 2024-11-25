"use client";
import useCart from "./useCart";
import { useEffect, useState } from "react";
import CartList from "./CartList";
import { LuShoppingBasket } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const Basket = () => {
  const pathname = usePathname();
  const [openCartList, setOpenCartList] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);
  const { itemsCount } = useCart();
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    setCurrentCount((current) => {
      if (current < itemsCount) {
        if (!bounce) {
          setBounce(true);

          setTimeout(() => {
            setBounce(false);
          }, 500);
        }
      }
      return itemsCount;
    });
  }, [itemsCount]);

  const moveBasketToCorner =
    pathname === "/checkout" || pathname.startsWith("/order");
  return (
    <>
      <section
        className="fixed bottom-0 my-2 -translate-x-1/2"
        title="Ver canasta"
        style={{
          left: moveBasketToCorner ? "3rem" : "50%",
          transition: "left 0.5s ease-out",
        }}
        onClick={() => setOpenCartList(!openCartList)}
      >
        <div
          className={`relative size-full rounded-full bg-blue-100 p-1 text-6xl text-blue-900 shadow-md ${bounce && "animate-basket"}`}
          id="basket"
        >
          {itemsCount > 0 && (
            <div className="absolute inset-1/2 grid aspect-square w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-green-500">
              <b className="font-mono text-lg text-white">{currentCount}</b>
            </div>
          )}
          <LuShoppingBasket />
        </div>
      </section>
      <CartList openCartList={openCartList} setOpenCartList={setOpenCartList} />
      {moveBasketToCorner && (
        <Link
          href="/"
          className="fixed bottom-0 right-0 m-3 flex items-center gap-3 rounded-full bg-white p-2 font-semibold shadow-md"
        >
          <IoIosArrowBack className="text-xl" />
          <span>Seguir comprando</span>
        </Link>
      )}
    </>
  );
};

export default Basket;
