import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import SheetWarp from "../SheetWarp";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArtWork from "../ArtWork";
import CountButton from "./CountButton";
import { Button } from "../ui/button";
import { XCircle } from "lucide-react";
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
    <SheetWarp status={data?.carts.length.toString()}>
      <ScrollArea className="h-full w-full p-2">
        <div className="flex flex-col justify-center items-center gap-4 px-2 py-4">
          {isPending && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
          {isSuccess &&
            data.carts.map((cart) => (
              <div
                className="grid grid-cols-5 gap-4 border rounded-md"
                key={cart.id}
              >
                <div className="col-span-2">
                  <ArtWork
                    aspectRatio="square"
                    imageUrl={cart.product.imageUrl}
                  />
                </div>
                <div className="col-span-3 flex flex-col items-start justify-end space-y-2">
                  <Button
                    size="icon"
                    variant={"ghost"}
                    className="rounded-full self-end"
                  >
                    <XCircle />
                  </Button>
                  <p>{cart.product.title}</p>
                  <p>{`${cart.qty}
                  ${cart.product.unit} x ${cart.product.price}= NT$ ${cart.total}
                  元`}</p>
                  <CountButton
                    qty={cart.qty}
                    id={cart.id}
                    isUseDebounce={true}
                  />
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </SheetWarp>
  );
}
