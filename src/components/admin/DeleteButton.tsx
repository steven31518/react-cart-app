import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { DialogWrap } from "../DialogWrap";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

enum DeleteItem {
  "product" = 0,
  "Coupon" = 1,
  "Order" = 2,
}
type Props = {
  id: string;
  label: string;
  deleteItem?: DeleteItem;
};

export default function DeleteButton({ id, deleteItem, label }: Props) {
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (id: string) => {
      if (deleteItem === DeleteItem.Coupon) return api.admin.deleteCoupon(id);

      return api.admin.deleteProduct(id as string);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success(
        `刪除${
          DeleteItem.Coupon === deleteItem
            ? "折價卷"
            : DeleteItem.Order === deleteItem
            ? "訂單"
            : "產品"
        }成功`
      );
    },
    onSettled: () => {
      if (deleteItem === DeleteItem.Coupon)
        queryClient.invalidateQueries({
          queryKey: ["getAllCoupons", { type: "admin" }],
        });
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts", { type: "admin" }],
      });
    },
  });

  return (
    <DialogWrap
      name="刪除"
      title={`刪除${
        DeleteItem.Coupon === deleteItem
          ? "折價卷"
          : DeleteItem.Order === deleteItem
          ? "訂單"
          : "產品"
      }`}
    >
      <div className="text-center flex flex-col items-center justify-center gap-4">
        <p>{`確認刪除${label}?`}</p>
        {isSuccess && <p className="text-green-500">已刪除成功</p>}
        <div className="flex justify-center mt-4">
          <DialogClose asChild>
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
          </DialogClose>
        </div>
      </div>
    </DialogWrap>
  );
}
