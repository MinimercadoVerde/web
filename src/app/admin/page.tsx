'use client'
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getInitialOrders } from "@/lib/redux/reducers/orders";
import { useEffect } from "react";

const AdminPage = () => {
const orders = useAppSelector(state => state.orders)
const pendingOrders = orders.orders.filter(order => order.status === 'pending');
const packedOrders = orders.orders.filter(order => order.status === 'packed');
const dispatch = useAppDispatch()

useEffect(() => {
  dispatch(getInitialOrders())
}, [])

  return (
    <section className="grid size-full grid-flow-col">
      <div className="bg-blue-500">
        <span>Ordenes pendientes</span>
        <div>
          {pendingOrders.map((order, index) => (
            <div key={index}>
              <p>Pedido #{order.customerName} - Total: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
        <span>Ordenes empacadas</span>
        <div>
          {packedOrders.map((order, index) => (
            <div key={index}>
              <p>Pedido #{order.customerName} - Total: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-green-500">
        <span>ordenes entregadas</span>
      </div>
    </section>
  );
};

export default AdminPage;
