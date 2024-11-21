import { useAppSelector } from "@/lib/redux/hooks";
import { selectItemsCount, selectSubtotal } from "@/lib/redux/reducers/cart";

const useCart = () => {
    const subtotal = useAppSelector(selectSubtotal)
    const itemsCount = useAppSelector(selectItemsCount)

    return { subtotal, itemsCount}
}


export default useCart 