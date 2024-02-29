import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../FormComponents";
import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import { Button } from "../ui/button";
import "react-credit-cards-2/dist/es/styles-compiled.css";
const PaymentSchema = z.object({
  name: z
    .string()
    .min(1, { message: "姓名為必填欄位" })
    .max(20, { message: "姓名不能超過20字元" })
    .refine(
      (value) => /^[\u4E00-\u9FA5]+$/.test(value) || /^[a-zA-Z]+$/.test(value),
      {
        message: "名稱只能包含字符，不能包含特殊符號",
      }
    ),
  number: z
    .string()
    .min(1, { message: "信用卡號為必填欄位" })
    .refine((value) => validator.isCreditCard(value), "請輸入有效的信用卡號"),
  expiry: z
    .string()
    .min(1, { message: "月份為必填欄位" })
    .max(4, { message: "請輸入有效的日期" })
    .refine(
      (value) => validator.isDate(value, { format: "MM/YY" }),
      "請輸入有效的日期"
    ),
  cvc: z
    .string()
    .min(1, { message: "CVV為必填欄位" })
    .refine(
      (value) => validator.isInt(value, { min: 100, max: 999 }),
      "請輸入有效的CVV"
    ),
});

export default function PaymentForm() {
  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      name: "",
      number: "",
      expiry: "mm/yy",
      cvc: "",
    },
  });
  const [focus, setFocus] = useState<Focused>("");
  const watch = form.watch();
  function onSubmit(data: z.infer<typeof PaymentSchema>) {
    console.log(data);
  }
  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(e.target.name as Focused);
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8">
      <Cards
        number={watch.number}
        expiry={watch.expiry}
        cvc={watch.cvc}
        name={watch.name}
        focused={focus}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 rounded-md gap-4 p-8 max-w-md border rouned-lg"
        >
          <CustomFormField
            label="姓名"
            name={"name"}
            control={form.control}
            handleInputFocus={handleInputFocus}
          />
          <div className="col-span-2">
            <CustomFormField
              label="信用卡卡號"
              name={"number"}
              control={form.control}
              handleInputFocus={handleInputFocus}
            />
          </div>
          <CustomFormField
            label="到期日"
            name={"expiry"}
            control={form.control}
            handleInputFocus={handleInputFocus}
          />

          <CustomFormField
            label="安全碼"
            name={"cvc"}
            control={form.control}
            handleInputFocus={handleInputFocus}
          />
          <div className="flex justify-center lg:col-span-2 self-end mt-6">
            <Button
              type="submit"
              size="icon"
              className="capitalize w-48 font-semibold"
            >
              確認付款
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
