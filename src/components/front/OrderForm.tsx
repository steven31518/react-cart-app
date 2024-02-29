import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { api } from "@/api";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormFieldTextArea,
} from "@/components/FormComponents";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const UserSchema = z.object({
  user: z.object({
    name: z
      .string()
      .min(1, { message: "姓名為必填欄位" })
      .max(20, { message: "姓名不能超過20字元" })
      .refine(
        (value) =>
          /^[\u4E00-\u9FA5]+$/.test(value) || /^[a-zA-Z]+$/.test(value),
        {
          message: "名稱只能包含字符，不能包含特殊符號",
        }
      ),
    // .regex(new RegExp("^[a-zA-Z]+$"), {
    //   message: "必須為正確文字格式",
    // }),
    email: z
      .string()
      .min(1, { message: "email為必填欄位" })
      .refine((value) => validator.isEmail(value), "請輸入有效的電子郵件"),
    tel: z
      .string()
      .min(1, { message: "電話為必填欄位" })
      .refine(
        (value) => validator.isMobilePhone(value, "zh-TW"),
        "請輸入有效的電話號碼"
      ),
    address: z
      .string()
      .min(3, { message: "地址為必填欄位" })
      .max(50, { message: "地址請勿超過50字元" }),
  }),
  message: z.string().max(250, { message: "留言請勿超過250字元" }),
});

type Props = { userData?: z.infer<typeof UserSchema> };
export default function OrderForm({ userData }: Props) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      user: {
        name: "" || userData?.user.name,
        email: "" || userData?.user.email,
        tel: "" || userData?.user.tel,
        address: "" || userData?.user.address,
      },
      message: "" || userData?.message,
    },
    disabled: !!userData,
  });
  const queryClient = useQueryClient();
  const setSearchParams = useSearchParams()[1];

  const { isPending, mutate } = useMutation({
    mutationFn: (data: z.infer<typeof UserSchema>) => api.client.addOrder(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success(data.message);
      form.reset();
      setSearchParams((pre) => {
        pre.set("id", data.orderId ?? "");
        pre.set("stage", "paymentCheck");
        return pre;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCart", { type: "client" }],
      });
    },
  });
  function onSubmit(data: z.infer<typeof UserSchema>) {
    mutate(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded-md place-self-strech w-full max-w-2xl"
      >
        <h1 className="font-semibold text-4xl mb-6">基本資料</h1>
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <CustomFormField
            label="姓名"
            name="user.name"
            control={form.control}
          />
          <CustomFormField
            label="電話"
            name="user.tel"
            control={form.control}
          />
          <div className="lg:col-span-2">
            <CustomFormField
              label="信箱"
              name="user.email"
              control={form.control}
            />
          </div>
          <div className="lg:col-span-2">
            <CustomFormField
              label="寄送地址"
              name="user.address"
              control={form.control}
            />
          </div>
          <div className="lg:col-span-2">
            <CustomFormFieldTextArea
              label="留言"
              name="message"
              control={form.control}
            />
          </div>
          {userData ? (
            ""
          ) : (
            <div className="flex justify-center lg:col-span-2 self-end mt-6">
              <Button
                type="submit"
                size="icon"
                className="capitalize w-48 font-semibold"
                disabled={isPending || !!userData}
              >
                <SendHorizontal />
                {isPending ? "送出中" : "送出訂單"}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
