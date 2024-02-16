import DataTable from "./DataTable";
import { coupon_columns } from "./TableColumn/coupon-columns";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function CouponTable() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getAllCoupons", { type: "admin" }],
    queryFn: () => api.admin.getAllCoupons(),
    select: (data) =>
      data.coupons.map((coupon) => {
        return {
          ...coupon,
          due_date: new Date(coupon.due_date),
        };
      }),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>{isSuccess && <DataTable columns={coupon_columns} data={data} />}</div>
  );
}
