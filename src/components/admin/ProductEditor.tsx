import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductForm from "@/components/admin/ProductForm";
import ImageUpload from "@/components/admin/ImageUpload";
import { Button } from "../ui/button";
import { ArrowLeftCircle } from "lucide-react";
export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <div>No data</div>;

  return (
    <main className="flex flex-col gap-4">
      <Button
        variant={"ghost"}
        className="rounded-full self-start"
        size="icon"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle />
      </Button>
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageUpload />
        </div>
        <ProductForm id={id} />
      </section>
    </main>
  );
}
