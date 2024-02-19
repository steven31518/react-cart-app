import { api } from "@/api";
import { transformCategory } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Store() {
  const { category } = useParams();
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["getProducts", category, { type: "client" }],
    queryFn: () =>
      api.client.getClientPageProducts("1", transformCategory(category ?? "")),
    select: (data) => data.products,
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isSuccess) {
    return (
      <main>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-[repeat(6,auto)] gap-x-4 gap-y-4 lg:gap-y-1 ">
          {data.map((product) => {
            return <ProductCard key={product.id} data={product} />;
          })}
        </section>
      </main>
    );
  }
}
