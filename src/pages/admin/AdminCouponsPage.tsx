import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CouponTable from "@/components/admin/CouponTable";
export default function AdminCouponsPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CouponTable />
    </HydrationBoundary>
  );
}
