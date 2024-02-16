import { useParams } from "react-router-dom";
import { useImageDropzoneStore } from "@/utils/zustand";
import ProductForm from "@/components/admin/ProductForm";
import ImageDropzone from "@/components/ImageDropzone";
import CarouselSize from "@/components/CarouselSize";
import { useEffect } from "react";
import ArtWork from "@/components/ArtWork";

export default function EditProductPage() {
  const { id } = useParams();
  const { imageUrls, removeAllImage, mainImageUrl, pickMainImage } =
    useImageDropzoneStore();

  useEffect(() => {
    removeAllImage();
  }, [id, removeAllImage]);
  return (
    <main className="grid md:grid-cols-2 gap-8 ">
      <div className="flex flex-col justify-start items-center rounded-md border gap-4 py-4">
        <ImageDropzone />

        <div className="flex flex-col items-center justify-center px-8 border rounded-lg w-[300px] aspect-[3/4]">
          {!mainImageUrl ? (
            "請於下方選擇主圖"
          ) : (
            <ArtWork imageUrl={mainImageUrl} aspectRatio="portrait" />
          )}
        </div>
        {imageUrls.length > 0 && (
          <CarouselSize imageUrls={imageUrls} pickMainImage={pickMainImage} />
        )}
      </div>
      <div>
        <ProductForm id={id as string} />
      </div>
    </main>
  );
}
