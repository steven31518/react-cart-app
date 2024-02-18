import { useParams } from "react-router-dom";
import ProductForm from "@/components/admin/ProductForm";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ProductEditor() {
  const { id } = useParams();

  if (!id) return <div>No data</div>;

  return (
    <main className="grid md:grid-cols-2 gap-8">
      <ImageUpload />
      <ProductForm id={id} />
    </main>
  );
}
