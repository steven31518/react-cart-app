import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { api } from "@/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import type { PostCart } from "@/api/cart";
import toast from "react-hot-toast";
type Props = {
  id: string;
  isActiveButton?: boolean;
  qty: number;
  className?: string;
  isUseDebounce?: boolean;
};
export default function CountButton({
  qty,
  className,
  isActiveButton,
  id,
  isUseDebounce = false,
}: Props) {
  const [countQty, setcountQty] = useState<number>(qty);

  const [value] = useDebounce(countQty, 1000);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: PostCart) => {
      if (isUseDebounce) return api.client.putCart(data);
      return api.client.postToCart(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success("已加入購物車");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart", { type: "client" }],
      });
    },
  });
  return (
    <div className="grid grid-flow-row grid-row-2 gap-4">
      <div
        className={cn(
          "flex items-center justify-center mb-2 border rounded-full p-2",
          className
        )}
      >
        <Button
          variant={"outline"}
          type="button"
          className="rounded-full p-3"
          id={`${id}-button-minus`}
          size="icon"
          onClick={() => setcountQty((pre) => (pre - 1 < 1 ? 1 : pre - 1))}
          disabled={isPending}
        >
          <LuMinus />
        </Button>
        <Input
          type="number"
          className="text-center text-lg my-auto border-0 p-4  focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={countQty.toString()}
          value={countQty}
          readOnly
        />
        <Button
          variant={"outline"}
          type="button"
          className="rounded-full p-3"
          id={`${id}-button-plus`}
          size="icon"
          onClick={() => setcountQty((pre) => pre + 1)}
          disabled={isPending}
        >
          <LuPlus />
        </Button>
      </div>
      {isActiveButton ? (
        <Button
          className="w-full"
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
