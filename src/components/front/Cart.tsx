import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SheetWarp from "../SheetWarp";
import ArtWork from "../ArtWork";
import CountButton from "./CountButton";
import CartDeleteButton from "./CartDeleteButton";
import { Separator } from "@/components/ui/separator";
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
              <div
                className="grid grid-cols-5 gap-4 border rounded-md "
                key={cart.id}
              >
                <div className="col-span-2">
                  <ArtWork
                    aspectRatio="square"
                    imageUrl={cart.product.imageUrl}
                  />
                </div>
                <div className="col-span-3 flex flex-col items-start justify-start gap-4">
                  <CartDeleteButton id={cart.id} className="self-end" />
                  <p>{`品項: ${cart.product.title}`}</p>
                  <p>{`總計: ${cart.qty}
                  ${cart.product.unit} x ${cart.product.price}= NT$ ${cart.total}
                  元`}</p>
                </div>
                <div className="col-span-5 px-4">
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
          <div className="flex flex-col items-end justify-end mt-2">
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
