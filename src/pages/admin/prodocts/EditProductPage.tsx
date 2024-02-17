import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductEditor from "@/components/admin/ProductEditor";

export default function EditProductPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductEditor />
    </HydrationBoundary>
  );
}
