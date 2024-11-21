import { useFormContext } from "react-hook-form"
import { forwardRef, RefObject, useContext, useRef } from "react"
import { StageContext } from "./UploadProductForm"
import Input from "./Input"
import { findByBarcode } from "@/lib/mongo/products"
import Link from "next/link"
import { UploadProduct } from "../productResolver"

const BarcodeInputs = () => {
  const dialog = useRef<HTMLDialogElement>(null)
  const { trigger, getFieldState, getValues, setError } = useFormContext<UploadProduct>()
  const { stage, setStage } = useContext(StageContext)

  const confirmBarcode = async () => {

    await trigger(["confirmBarcode"]);
    if (getFieldState("confirmBarcode").invalid) return;
    const barcode = getValues("barcode").toString();
    const alreadyCreated = await findByBarcode(barcode);
    if (alreadyCreated) { dialog.current?.showModal(); setError("barcode", { type: "value", message: "Este producto ya fue creado" }); return };
    setStage(1)
  }

  return (
    <>
      <Input name='barcode' label='Código de barras' type='number' disabled={stage > 0} showAt={0} />
      <Input name='confirmBarcode' label='Confirma código de barras' type='number' disabled={stage > 0} showAt={0} onChange={confirmBarcode} />
      <AlreadyCreatedDialog ref={dialog} barcode={getValues("barcode")} />
    </>
  )
};



const AlreadyCreatedDialog = forwardRef<HTMLDialogElement, { barcode: string }>(({ barcode = 0 }, ref) => {

  return (
    <dialog ref={ref}>
      <div className="flex flex-col gap-2 items-center text-center p-3 rounded-md">
        <span >{barcode}</span>
        <p className="font-semibold text-xl my-3">Este producto ya fue creado</p>
        <p className="text-blue-500">¿Deseas editarlo?</p>
        <div className="flex flex-row-reverse gap-5 *:rounded-full *:px-3 text-lg font-medium">
          <Link href={`/admin/edit-product/${barcode}`} className="bg-blue-400 text-white" >Editar</Link>
          <button type="button" onClick={() => (ref as RefObject<HTMLDialogElement>)?.current?.close()}>Cancelar</button>
        </div>
      </div>
    </dialog>
  )
})
export default BarcodeInputs;