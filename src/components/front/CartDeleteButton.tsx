import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { XCircle } from "lucide-react";
import { api } from "@/api";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  className?: string;
};
export default function CartDeleteButton({ id, className }: Props) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (id: string) => api.client.deleteCartItem(id),
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
    <Button
      size="icon"
      variant={"ghost"}
      className={cn("rounded-full", className)}
      disabled={isPending}
      onClick={() => mutate(id)}
    >
      <XCircle />
    </Button>
  );
}
