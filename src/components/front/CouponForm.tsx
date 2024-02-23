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
const formSchema = z.object({
  code: z.string(),
});

type CouponCode = z.infer<typeof formSchema>;
export default function CouponForm() {
  const form = useForm<CouponCode>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
  });
  const queryClient = useQueryClient();
  const { isPending } = useMutation({
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
    console.log(value);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-muted"
      >
        <CustomFormField
          name="code"
          label="優惠卷代碼"
          control={form.control}
        />
      </form>
      <Button type="submit" size="icon" disabled={isPending}>
        <HandCoins />
        {isPending ? "Loading..." : "領取優惠"}
      </Button>
    </Form>
  );
}
