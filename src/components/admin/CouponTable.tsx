import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingPage from "../LoadingPage";
import DataTable from "./DataTable";
import { coupon_columns } from "./TableColumn/coupons-columns";

export default function CouponTable() {
  const filter = [
    { label: "折價券名稱", value: "title" },
    { label: "折扣", value: "percent" },
  ];
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
  if (isPending) return <LoadingPage />;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      {isSuccess && (
        <DataTable columns={coupon_columns} data={data} filter={filter} />
      )}
    </div>
  );
}
