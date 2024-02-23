import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import {
  CustomFormField,
  CustomFormFieldNum,
  CustomFormFieldCalendar,
  CustomFormFieldSwitch,
} from "../FormComponents";
import { Button } from "../ui/button";
import type { CouponType } from "./TableColumn/coupons-columns";
import type { CouponRequest } from "@/api/adim/coupon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import toast from "react-hot-toast";

export const NewCouponSchema = z.object({
  code: z.string().min(1, { message: "代碼欄位必填" }),
  due_date: z.date({ required_error: "到期日必填" }),
  is_enabled: z.number(),
  percent: z.number({ required_error: "折扣%數必填" }).max(100, {
    message: "折扣%數不得大於100",
  }),
  title: z.string().min(1, { message: "折價券名稱必填" }),
});
export const CouponSchema = NewCouponSchema.omit({ due_date: true }).extend({
  id: z.string(),
  num: z.number(),
  due_date: z.number(),
});

type Props = {
  data: CouponType;
};
export default function CouponForm({ data }: Props) {
  const form = useForm<z.infer<typeof NewCouponSchema>>({
    resolver: zodResolver(NewCouponSchema),
    defaultValues: {
      code: "" || data.code,
      due_date: new Date(data.due_date ?? new Date()),
      is_enabled: 0 || data.is_enabled,
      percent: 0 || data.percent,
      title: "" || data.title,
    },
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, id }: { data: CouponRequest; id: string }) => {
      if (!id) return api.admin.createCoupon(data);
      return api.admin.editCoupon(data, id);
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
        queryKey: ["getAllCoupons", { type: "admin" }],
      });
    },
  });

  function onSubmit(values: z.infer<typeof NewCouponSchema>) {
    mutate({
      data: { ...values, due_date: values.due_date.getTime() },
      id: data.id,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded-md w-full max-w-2xl"
      >
        <h1 className="font-semibold text-4xl mb-6">
          {data.id ? "編輯折價卷" : "新增折價卷"}
        </h1>
        <div className="grid grid-flow-row gap-4 items-start">
          <CustomFormField
            label="優惠卷名稱"
            name="title"
            control={form.control}
          />
          <CustomFormField
            label="優惠卷代碼"
            name="code"
            control={form.control}
          />
          <CustomFormFieldNum
            label="折扣比例"
            name="percent"
            control={form.control}
          />
          <div className="flex flex-col items-start justify-between sm:flex-row">
            <CustomFormFieldCalendar
              label="到期日"
              name="due_date"
              control={form.control}
            />
            <CustomFormFieldSwitch
              label="是否啟用"
              name="is_enabled"
              control={form.control}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              size="icon"
              className="capitalize w-48 font-semibold"
              disabled={isPending}
            >
              {isPending ? "讀取中..." : "確認"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
