import { ChangeEventHandler, useContext, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { StageContext } from "./UploadProductForm"
import { IoIosAddCircleOutline } from "react-icons/io"
import { uploadImage } from "@/lib/cloudinary/actions"
import { CldImage } from "next-cloudinary"
import { LuLoader2 } from "react-icons/lu"
import { UploadProduct } from "../productResolver"

const ImageInput = () => {

    const { register, getValues, setValue } = useFormContext<UploadProduct>()
    const { stage, setStage } = useContext(StageContext)
    const [imageId, setImageId] = useState<string>("")

    const [imageState, setImageState] = useState<"idle" | "loading" | "loaded" | "failed">("idle")

    const inputRef = useRef<HTMLInputElement>(null)

    const UploadImage: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        setImageState("loading")
        const formData = new FormData()
        formData.append('newProductImage', file)

        const cloudinaryData: any = await uploadImage(formData, getValues("confirmBarcode").toString())

        if (!cloudinaryData.public_id) return;
        stage === 1 && setStage(2)
        setImageId(cloudinaryData.public_id)
        setValue("image", cloudinaryData.public_id)
        setImageState("loaded")
    }

    return (
        <>
            {
                stage >= 1 &&
                <div className='image-input' onClick={() => inputRef.current?.click()}>
                    {
                        (() => {
                            switch (imageState) {

                                case "idle":
                                    return (
                                        <div className='text-5xl text-gray-500 text-center flex flex-col items-center gap-5'>
                                            <IoIosAddCircleOutline />
                                            <span className='text-sm font-semibold'>Añadir imagen del producto</span>
                                            <input
                                                type="file"
                                                accept='".png, .jpg, .jpeg"'
                                                capture="environment"
                                                id="barcode"
                                                onChange={UploadImage}
                                                hidden
                                                required
                                                autoFocus={stage === 1}
                                                ref={inputRef}
                                                disabled={stage < 1}
                                            />
                                        </div>
                                    )
                                case "loading":
                                    return (
                                        <LuLoader2 className="animate-spin text-4xl text-blue-500" />
                                    )

                                case "loaded":
                                    return (
                                        <figure className="input-image">
                                            <CldImage src={imageId} alt="product image"  fill className="h-full aspect-square object-cover rounded-sm" />
                                        </figure>
                                    )

                            }
                        })()
                    }

                    <input {...register("image")} hidden required />
                </div>
            }
        </>
    )

}

export default ImageInput;