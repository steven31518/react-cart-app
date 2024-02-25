import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { api } from "@/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import type { PostCart } from "@/api/cart";
import toast from "react-hot-toast";
import CartLoading from "./CartLoading";
type Props = {
  id: string;
  addCartButton?: boolean;
  qty?: number;
  className?: string;
  isUseDebounce?: boolean;
};
export default function CountButton({
  qty,
  className,
  addCartButton,
  id,
  isUseDebounce,
}: Props) {
  const [countQty, setcountQty] = useState<number>(qty??1);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostCart) => {
      if (!isUseDebounce) {
        console.log("post")
        return api.client.postToCart(data);
      } else {
        console.log("put")
        return api.client.putCart(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart", { type: "client" }],
      });
    },
  });
  const debounced = useDebouncedCallback(
    () => mutate({ data: { product_id: id, qty: countQty } }),
    500
  );
  return (
    <div className="grid grid-flow-row grid-row-2 gap-4 relative ">
      {isPending && isUseDebounce && <CartLoading />}
      <div
        className={cn(
          "flex items-center justify-center mb-2 border rounded-full p-2 bg-background",
          className
        )}
      >
        <Button
          type="button"
          className="rounded-full p-3"
          id={`${id}-button-minus`}
          size="icon"
          onClick={() => {
            setcountQty((pre) => (pre - 1 < 1 ? 1 : pre - 1));
            if (isUseDebounce) debounced();
          }}
          disabled={isPending}
        >
          <LuMinus />
        </Button>

        <Input
          type="number"
          className="text-center text-lg my-auto border-0 p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={isPending ? "處理中..." : countQty.toString()}
          value={isPending ? "處理中..." : countQty}
          readOnly
        />

        <Button
          type="button"
          className="rounded-full p-3"
          id={`${id}-button-plus`}
          size="icon"
          onClick={() => {
            setcountQty((pre) => pre + 1);
            if (isUseDebounce) debounced();
          }}
          disabled={isPending}
        >
          <LuPlus />
        </Button>
      </div>
      {addCartButton ? (
        <Button
          className="w-full rounded-full"
          size="lg"
          disabled={isPending}
          onClick={() =>
            mutate({
              data: {
                product_id: id,
                qty: countQty,
              },
            })
          }
        >
          <PlusCircle />
          <span>{isPending ? "加入中" : "加入購物車"}</span>
        </Button>
      ) : null}
    </div>
  );
}
