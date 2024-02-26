import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import OrderSearch from "@/components/front/OrderSearch";

export default function OrderDetailPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderSearch />
    </HydrationBoundary>
  );
}
