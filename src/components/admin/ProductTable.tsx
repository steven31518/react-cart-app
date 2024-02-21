import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import DataTable from "./DataTable";
import { products_columns } from "./TableColumn/products-columns";

export default function ProductTable() {
  // const [page, setPage] = useState<string>("1");
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getAllProducts", { type: "admin" }],
    queryFn: () => api.admin.getAdminProducts(),
    select: (data) => Object.values(data.products),
  });
  const filter = [
    { label: "產品", value: "title" },
    { label: "類別", value: "category" },
  ];

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <main className="flex flex-col gap-4">
      {isSuccess && (
        <DataTable columns={products_columns} data={data} filter={filter} />
      )}
    </main>
  );
}
