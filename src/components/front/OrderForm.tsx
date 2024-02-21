import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField, CustomFormFieldTextArea } from "../FormComponents";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
export const OrderSchema = z.object({
  user: z.object({
    name: z
      .string()
      .min(1, { message: "姓名為必填欄位" })
      .max(20, { message: "姓名不能超過20字元" })
      .regex(new RegExp("^[a-zA-Z]+$"), {
        message: "必須為正確文字格式",
      }),
    email: z.string().refine(validator.isEmail, "請輸入有效的電子郵件"),
    tel: z.string().refine(validator.isMobilePhone, "請輸入有效的電話號碼"),
    address: z.string().min(3).max(255),
  }),
  message: z.string().max(250, { message: "留言請勿超過250字元" }),
});

export default function OrderForm() {
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof OrderSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded place-self-stretch"
      >
        <h1 className="font-semibold text-4xl mb-6">基本資料</h1>
        <div className="grid gap-4 lg:grid-cols-2 items-start">
          <CustomFormField name="name" label="姓名" control={form.control} />
          <CustomFormField name="tel" label="電話" control={form.control} />
          <div className="lg:col-span-2">
            <CustomFormField name="email" label="信箱" control={form.control} />
          </div>
          <div className="lg:col-span-2">
            <CustomFormField
              name="address"
              label="寄送地址"
              control={form.control}
            />
          </div>
          <div className="lg:col-span-2">
            <CustomFormFieldTextArea
              name="message"
              label="留言"
              control={form.control}
            />
          </div>
          <div className="flex justify-center lg:col-span-2 self-end">
            <Button
              type="submit"
              size="icon"
              className="capitalize w-48 font-semibold"
            >
              <SendHorizontal />
              確認送出
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
