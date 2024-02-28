import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../FormComponents";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { HandCoins } from "lucide-react";
import { DialogWrap } from "../DialogWrap";
const formSchema = z.object({
  code: z.string(),
});

type CouponCode = z.infer<typeof formSchema>;
export default function CouponInput() {
  const form = useForm<CouponCode>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: ({ data: data }: Record<"data", CouponCode>) =>
      api.client.userCoupon({ data: data }),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success(`${data.message},購物車已更新`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart", { type: "client" }],
      });
    },
  });
  function onSubmit(value: CouponCode) {
    mutate({ data: value });
  }
  return (
    <DialogWrap name="輸入優惠" title="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 bg-muted py-4 px-4 rounded-lg"
        >
          <CustomFormField
            name="code"
            label="優惠卷代碼"
            control={form.control}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isPending}
            className="w-48 self-center"
          >
            <HandCoins />
            {isPending ? "Loading..." : "領取優惠"}
          </Button>
        </form>
      </Form>
    </DialogWrap>
  );
}
