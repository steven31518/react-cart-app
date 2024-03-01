import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import LoadingPage from "../LoadingPage";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import CouponInput from "./CouponForm";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import PriceCard from "../PriceCard";
import OrderForm from "./OrderForm";

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
  if (isPending) return <LoadingPage />;
  if (isError) return <div>{error.message}</div>;
  if (isSuccess)
    return (
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col justify-center items-start max-w-2xl">
            <h1 className="font-semibold text-4xl mb-6">購物明細</h1>
            <CouponInput />
            <ScrollArea className="h-[400px] mb-4 border rounded-md p-4">
              <p className="text-start">{`共${data.carts.length}項商品`}</p>
              <Separator className="my-2" />
              {data.carts.map((cart) => (
                <div className="p-4 border rounded mb-2 " key={cart.id}>
                  <PriceCard data={cart} />
                </div>
              ))}
            </ScrollArea>
            <h1 className="font-semibold text-4xl self-end">
              {`總計: NT$ ${data.final_total} 元`}
            </h1>
          </div>
          {isSuccess && data?.carts.length > 0 ? (
            <OrderForm />
          ) : (
            <div>購物車是空的</div>
          )}
        </div>
        <div className="flex justify-center items-center mb-4">
          <p className="text-center p-2 ">還想購物嗎?</p>
          <Link to={"/products"}>
            <Button variant={"link"} className="text-blue-500">
              繼續購物
            </Button>
          </Link>
        </div>
      </section>
    );
}
