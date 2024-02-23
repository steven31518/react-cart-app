import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
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
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <main className="flex flex-col gap-4">
      {isSuccess && (
        <DataTable columns={order_columns} data={data} filter={filter} />
      )}
    </main>
  );
}
