import ProductDetail from "@/components/front/ProductDetail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default function ProductPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail />
    </HydrationBoundary>
  );
}
