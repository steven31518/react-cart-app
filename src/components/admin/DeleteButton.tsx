import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DialogWrap } from "../DialogWrap";
import { Button } from "../ui/button";
import { api } from "@/api";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
type Props = {
  id: string;
  label: string;
  deleteItem: "產品" | "折價卷" | "訂單";
};

export default function DeleteButton({ id, deleteItem, label }: Props) {
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (id: string) => {
      return api.admin.deleteProduct(id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success(`刪除${deleteItem}成功`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts", { type: "admin" }],
      });
    },
  });

  return (
    <DialogWrap name="刪除" title={`刪除${deleteItem}`}>
      <div className="text-center flex flex-col items-center justify-center gap-4">
        <p>{`確認刪除${label}?`}</p>{" "}
        {isSuccess && <p className="text-green-500">已刪除成功</p>}
        <div className="flex justify-center mt-4">
          <Button
            variant="destructive"
            className={cn("w-48", {
              hidden: isSuccess,
            })}
            disabled={isPending}
            onClick={() => mutate(id)}
          >
            {isPending ? "刪除中..." : "確認刪除"}
          </Button>
        </div>
      </div>
    </DialogWrap>
  );
}
