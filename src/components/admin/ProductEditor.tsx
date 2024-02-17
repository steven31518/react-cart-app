import { useParams } from "react-router-dom";
import { useImageDropzoneStore } from "@/utils/zustand";
import ProductForm from "@/components/admin/ProductForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { useEffect } from "react";

export default function ProductEditor() {
  const { id } = useParams();
  const { removeAllImage } = useImageDropzoneStore();

  useEffect(() => {
    removeAllImage();
  }, [id, removeAllImage]);

  if (!id) return <div></div>;

  return (
    <main className="grid md:grid-cols-2 gap-8">
      <ImageUpload />
      <ProductForm id={id} />
    </main>
  );
}
