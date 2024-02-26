import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import OrderForm from "./OrderForm";
import { Separator } from "../ui/separator";
import PriceCard from "../PriceCard";
import CouponInput from "./CouponForm";

export default function Order() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getCart", { type: "client" }],
    queryFn: () => api.client.getCart(),
    select: (data) => ({
      carts: data.data.carts,
      total: data.data.total,
      final_total: data.data.final_total,
    }),
  });
  return (
    <section className="py-8 px-4 sm:px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-y-8 ">
        <div className="flex flex-col justify-center items-end max-w-lg">
          <div className="flex flex-col justify-center items-start gap-8 px-2 py-4 lg:gap-4">
            <h1 className="font-semibold text-4xl mb-6">購物明細</h1>
            <CouponInput />
            {isPending && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}
            {isSuccess &&
              data.carts.map((cart) => (
                <div className="p-4 border rounded" key={cart.id}>
                  <PriceCard data={cart} />
                </div>
              ))}
          </div>
          <Separator />
          {isSuccess && (
            <div className="flex flex-col items-end justify-end mt-2">
              <h1 className="font-semibold text-4xl">
                {`總計: NT$ ${data.final_total} 元`}
              </h1>
            </div>
          )}
        </div>
        {isSuccess && data?.carts.length > 0 ? (
          <OrderForm />
        ) : (
          <div>購物車是空的</div>
        )}
      </div>
    </section>
  );
}
