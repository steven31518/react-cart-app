import { useParams } from "react-router-dom";
import BackButton from "../BackButton";
import ProductForm from "@/components/admin/ProductForm";
import ImageUpload from "@/components/admin/ImageUpload";

export default function ProductEditor() {
  const { id } = useParams();
  if (!id) return <div>No data</div>;
  return (
    <section className="flex flex-col gap-4">
      <BackButton />
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageUpload />
        </div>
        <ProductForm id={id} />
      </section>
    </section>
  );
}
