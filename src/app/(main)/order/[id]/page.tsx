import { getOrderById } from "@/lib/mongo/orders"
import { Order } from "@/model/order"
import ConfirmedOrder from "../../checkout/components/ConfirmedOrder"

const RecentOrdersPage = async ({params}: {params: {id: string}}) => {

  const order = JSON.parse(await getOrderById(params.id)) as Order
  return (
    <ConfirmedOrder order={order}/>
  )
}

export default RecentOrdersPage