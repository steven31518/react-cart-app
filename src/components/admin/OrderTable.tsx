import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage";
import { order_columns } from "./TableColumn/orders-columns";
import DataTable from "./DataTable";

export default function OrderTable() {
  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["getAllOrders", { type: "admin" }],
    queryFn: () => api.admin.getOrders(),
    select: (data) => data.orders,
  });
  const filter = [{ label: "訂單編號", value: "id" }];
  if (isPending) {
    return <LoadingPage />;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <section className="flex flex-col gap-4">
      {isSuccess && (
        <DataTable columns={order_columns} data={data} filter={filter} />
      )}
    </section>
  );
}
