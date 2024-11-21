import { ChangeEventHandler, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { uploadImage } from "@/lib/cloudinary/actions"
import { CldImage } from "next-cloudinary"
import { LuLoader2 } from "react-icons/lu"
import { UploadProduct } from "../productResolver"

const ImageInput = () => {

    const { register, getValues, setValue} = useFormContext<UploadProduct>()

    const [imageState, setImageState] = useState< "loading" | "loaded" | "failed">("loaded")

    const inputRef = useRef<HTMLInputElement>(null)

    const UploadImage: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        setImageState("loading")
        const formData = new FormData()
        formData.append('newProductImage', file)

        const cloudinaryData: any = await uploadImage(formData, getValues("barcode").toString())

        if (!cloudinaryData.public_id) return;
        setValue("image", cloudinaryData.public_id)
        setImageState("loaded")
    }

    return (

        <div className='image-input' onClick={() => inputRef.current?.click()}>
            {
                (() => {
                    switch (imageState) {

                        case "loading":
                            return (
                                <LuLoader2 className="animate-spin text-4xl text-blue-500" />
                            )

                        case "loaded":
                            return (
                                <figure className="input-image">
                                    <CldImage src={getValues("image")}  alt="product image" fill className="h-full aspect-square object-cover rounded-sm" />
                                </figure>
                            )

                    }
                })()
            }
            <input
                type="file"
                accept='".png, .jpg, .jpeg"'
                capture="environment"
                id="barcode"
                onChange={UploadImage}
                hidden
                required
                readOnly
                ref={inputRef}
            />
            <input {...register("image")} hidden required />
        </div>

    )

}

export default ImageInput;