import DataTable from "./DataTable";
import { products_columns } from "./TableColumn/products-columns";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function ProductTable() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getAllProducts", { type: "admin" }],
    queryFn: () => api.admin.getAdminProducts(),
    select: (data) => Object.values(data.products),
  });

  
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {isSuccess && (
        <DataTable columns={products_columns} data={data} filterName="title" />
      )}
    </div>
  );
}
