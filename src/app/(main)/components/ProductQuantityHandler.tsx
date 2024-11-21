import { useAppDispatch } from "@/lib/redux/hooks"
import { addItem, removeItem } from "@/lib/redux/reducers/cart"
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6"

const ProductQuantityHandler = ({quantity, barcode}: {quantity: number, barcode: string}) => {
    const dispatch = useAppDispatch()
    return (
  
      <div className='rounded-full bg-white h-fit w-24 mx-auto grid grid-cols-3 place-items-center gap-3 px-2 text-lg select-none'>
        <div className='text-blue-400' onClick={() => dispatch(removeItem(barcode))}>
          {quantity > 1 ? <FaMinus /> : <FaRegTrashCan />}
        </div>
        <span className='text-inherit font-medium'>{quantity}</span>
        <div className='text-blue-400' onClick={() => dispatch(addItem(barcode))}>
          <FaPlus /></div>
      </div>
    )
  }

export default ProductQuantityHandler