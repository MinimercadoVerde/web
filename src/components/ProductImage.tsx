"use client";
import { CldImage } from "next-cloudinary";

const ProductImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <figure className="relative aspect-square w-full overflow-clip bg-white">
      <CldImage
        src={src}
        fill
        alt={alt}
        sizes="33vw"
        className="object-contain object-center py-1"
      />
    </figure>
  );
};

export default ProductImage;
