import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import PriceCard from "../PriceCard";
import OrderForm from "./OrderForm";
type Props = {
  searchParams: string;
};
export default function OrderDetail({ searchParams }: Props) {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["searchOrder", searchParams],
    queryFn: () => api.client.getOrderWithId(searchParams ?? ""),
  });
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>查無結果</div>;
  if (isSuccess)
    return (
      <section className="container">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col justify-start items-start gap-2 max-w-lg">
            <h1 className="text-4xl font-semibold mb-6 ">訂單明細</h1>
            <p className="">{`訂單編號:${searchParams}`}</p>
            <div className=" flex">
              <p>付款狀態:</p>
              {data.order.is_paid ? (
                <p className="text-green-500">已付款</p>
              ) : (
                <Link className="text-blue-500" to={`/pay/${searchParams}`}>
                  點我前往付款
                </Link>
              )}
            </div>
            <p className="">{`訂單日期:${new Date(
              data.order.create_at * 1000
            ).toLocaleDateString()}`}</p>
            <p className="">商品明細如下:</p>
            <ScrollArea className="h-[400px] mb-4 border rounded-md p-4">
              <p className="text-start">{`共${Object.values(data.order.products).length}項商品`}</p>
              <Separator className="my-2" />
              {Object.values(data.order.products).map((product) => {
                return (
                  <div className="p-4 border rounded mb-2" key={product.id}>
                    <PriceCard data={product} />
                  </div>
                );
              })}
            </ScrollArea>
            <h1 className="font-semibold text-4xl self-end ">{`總計金額:NT$ ${data.order.total}`}</h1>
          </div>
          <OrderForm
            userData={{
              user: { ...data.order.user },
              message: data.order.message,
            }}
          />
        </div>
      </section>
    );
}
