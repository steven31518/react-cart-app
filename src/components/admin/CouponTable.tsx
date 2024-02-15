import DataTable from "./DataTable";
import { coupon_columns } from "./TableColumn/coupon-columns";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function CouponTable() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getAllProducts", { type: "admin" }],
    queryFn: () => api.admin.getAllCoupons(),
    select: (data) =>
      data.coupons.map((coupon) => {
        return {
          ...coupon,
          due_date: new Date(coupon.due_date * 1000),
        };
      }),
  });
  if (isPending) return <div>Loading...</div>;
  if (isSuccess)
    return (
      <div>
        <DataTable columns={coupon_columns} data={data} />
      </div>
    );
  if (isError) return <div>{error.message}</div>;
}
