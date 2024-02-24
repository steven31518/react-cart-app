import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import OrderForm from "../front/OrderForm";
export default function OrderCheckForm(id: string) {
  const { data, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["getOrderWithId", id],
    queryFn: () => api.client.getOrderWithId(id),
    select: (data) => data,
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  if (isSuccess)
    return (
      <div className="grid grid-cols-2 gap-4">
        <OrderForm
          userData={{
            user: { ...data.user },
            message: data.message,
          }}
        />
      </div>
    );
}
