import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { CustomFormField } from "../FormComponents";
import { useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import { Button } from "../ui/button";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
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
    .max(16, { message: "請輸入有效的信用卡號" })
    .refine((value) => validator.isCreditCard(value), "請輸入有效的信用卡號"),
  expiry: z
    .string()
    .min(1, { message: "月份為必填欄位" })
    .max(5, { message: "請輸入有效的日期" })
    .refine((value) => {
      const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY
      if (!regex.test(value)) {
        return false;
      }
      const [month, year] = value.split("/");
      const currentYear = new Date().getFullYear() % 100;
      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear &&
          parseInt(month) < new Date().getMonth() + 1)
      ) {
        return false;
      }
      return true;
    }, "請輸入有效的日期，格式應為MM/YY且必須是未來的日期"),

  cvc: z
    .string()
    .min(1, { message: "CVV為必填欄位" })
    .refine(
      (value) => validator.isInt(value, { min: 100, max: 999 }),
      "請輸入有效的CVV"
    ),
});

export default function PaymentForm({ id }: { id: string }) {
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
  const setSearchParams = useSearchParams()[1];
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => api.client.payOrder(id),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error("付款失敗");
      toast.success(data.message);
      setSearchParams((pre) => {
        pre.set("stage", "success");
        return pre;
      });
    },
    onSettled: () => {
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["searchOrder", id],
      });
    },
  });

  function onSubmit(data: z.infer<typeof PaymentSchema>) {
    if (data) mutate(id);
  }

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocus(e.target.name as Focused);
  }
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 rounded-md gap-4 p-8  border rouned-lg place-self-stretch"
          >
            <div className="lg:col-span-2">
              <CustomFormField
                label="信用卡卡號"
                name={"number"}
                control={form.control}
                handleInputFocus={handleInputFocus}
              />
            </div>
            <CustomFormField
              label="姓名"
              name={"name"}
              control={form.control}
              handleInputFocus={handleInputFocus}
            />

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
                disabled={isPending}
              >
                {isPending ? "送出中..." : "確認付款"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="place-self-center">
        <Cards
          number={watch.number}
          expiry={watch.expiry}
          cvc={watch.cvc}
          name={watch.name}
          focused={focus}
        />
      </div>
    </div>
  );
}
