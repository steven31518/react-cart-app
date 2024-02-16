import { useParams } from "react-router-dom";
import ProductForm from "@/components/admin/ProductForm";
export default function EditProductPage() {
  const { id } = useParams();
  return (
    <main className="grid md:grid-cols-2 gap-4">
      <div>Image</div>
      <div>
        <ProductForm id={id as string} />
      </div>
    </main>
  );
}
