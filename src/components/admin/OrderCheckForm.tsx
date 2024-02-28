import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage";
import OrderForm from "../front/OrderForm";
export default function OrderCheckForm(id: string) {
  const { data, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["getOrderWithId", id],
    queryFn: () => api.client.getOrderWithId(id),
    select: (data) => data,
  });
  if (isPending) return <LoadingPage/>
  if (isError) return <div>{error.message}</div>;
  if (isSuccess)
    return (
      <div className="grid grid-cols-2 gap-4">
        <OrderForm
          userData={{
            user: { ...data.order.user },
            message: data.order.message,
          }}
        />
      </div>
    );
}
