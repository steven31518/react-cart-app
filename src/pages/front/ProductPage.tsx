import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductDetail from "@/components/front/ProductDetail";
export default function ProductPage() {
  const { id } = useParams();
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {id && <ProductDetail id={id} />}
    </HydrationBoundary>
  );
}
