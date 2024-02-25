import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SheetWarp from "../SheetWarp";
import CountButton from "./CountButton";
import CartDeleteButton from "./CartDeleteButton";
import { Separator } from "@/components/ui/separator";
import PriceCard from "../PriceCard";

export default function Cart() {
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
    <SheetWarp status={data?.carts.length}>
      <div className="flex flex-col justify-center items-end max-w-lg mb-2">
        {isPending && <div>Loading...</div>}
        {isError && <div>{error.message}</div>}
        <div className="flex flex-col justify-center items-start gap-8 px-2 py-4 lg:gap-4">
          {isSuccess &&
            data.carts.map((cart) => (
              <div className="flex flex-col border rounded-md" key={cart.id}>
                <CartDeleteButton id={cart.id} className="self-end" />
                <PriceCard data={cart} />
                <div className="px-4 mt-2">
                  <CountButton
                    qty={cart.qty}
                    id={cart.id}
                    isUseDebounce={true}
                  />
                </div>
              </div>
            ))}
        </div>
        <Separator />
        {isSuccess && (
          <div className="flex flex-col items-end justify-end mt-2 px-4">
            <p>{`小計: NT$ ${data.total} 元`}</p>
            <h1 className="font-semibold text-4xl">
              {`總計: NT$ ${data.final_total} 元`}
            </h1>
          </div>
        )}
      </div>
    </SheetWarp>
  );
}
{
  /* <CountButton qty={cart.qty} id={cart.id} isUseDebounce={true} /> */
}
