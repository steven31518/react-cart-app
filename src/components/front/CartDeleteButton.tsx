import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { XCircle } from "lucide-react";
import { api } from "@/api";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import CartLoading from "./CartLoading";

type Props = {
  id: string | "all";
  className?: string;
  name?: string;
};
export default function CartDeleteButton({
  id = "all",
  className,
  name,
}: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => {
      if (id === "all") {
        return api.client.deleteCart();
      } else {
        return api.client.deleteCartItem(id);
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
  return (
    <>
      {isPending && <CartLoading />}
      <Button
        size="icon"
        variant={"ghost"}
        className={cn("rounded-full text-destructive", className)}
        disabled={isPending}
        onClick={() => mutate(id)}
      >
        <XCircle />
        {name}
      </Button>
    </>
  );
}
