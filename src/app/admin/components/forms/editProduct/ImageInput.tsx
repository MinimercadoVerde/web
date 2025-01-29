import { ChangeEventHandler, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { uploadImage } from "@/lib/cloudinary/actions";
import { CldImage } from "next-cloudinary";
import { LuLoader } from "react-icons/lu";
import { UploadProduct } from "../productResolver";
import { IoIosAddCircleOutline } from "react-icons/io";

const ImageInput = () => {
  const { register, getValues, setValue } = useFormContext<UploadProduct>();

  const [imageState, setImageState] = useState<"loading" | "loaded" | "failed">(
    "loaded",
  );
  const imageId = getValues("image");

  const inputRef = useRef<HTMLInputElement>(null);

  const UploadImage: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageState("loading");
    const formData = new FormData();
    formData.append("NewProductReportImage", file);

    const cloudinaryData: any = await uploadImage(
      formData,
      getValues("barcode").toString(),
    );

    if (!cloudinaryData.public_id) return;
    setValue("image", cloudinaryData.public_id);
    setImageState("loaded");
  };
  return (
    <div className={`image-input ${!imageId && 'border-red-500'}`} onClick={() => inputRef.current?.click()}>
      {(() => {
        switch (imageState) {
          case "loading":
            return (
              <LuLoader className="animate-spin text-4xl text-blue-500" />
            );

          case "loaded":
            return (
              <figure className="input-image">
                {imageId ? (
                  <CldImage
                    src={imageId}
                    alt="product image"
                    fill
                    className="aspect-square h-full rounded-xs object-cover"
                  />
                ) : (
                  <div className="grid place-items-center gap-5 text-center text-5xl text-gray-500">
                    <IoIosAddCircleOutline />
                    <span className="text-sm font-semibold">
                      Añadir imagen del producto
                    </span>
                  </div>
                )}
              </figure>
            );
        }
      })()}
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
      <input {...register("image")} hidden
      //required not required while uploading initial products
      />
    </div>
  );
};

export default ImageInput;
