import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import OrderTable from "@/components/admin/OrderTable";
export default function AdminOrdersPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderTable />
    </HydrationBoundary>
  );
}
