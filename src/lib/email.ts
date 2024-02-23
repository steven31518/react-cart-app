import emailjs from "@emailjs/browser";
import Handlebars from "handlebars";
import { z } from "zod";
import { orderLinkMail } from "./emailTemplates/orderLinkMail";
import validator from "validator";
export const EmailSchema = z.object({
  from_name: z
    .string()
    .min(1, { message: "姓名為必填欄位" })
    .max(20, { message: "姓名不能超過20字元" })
    .refine(
      (value) => /^[\u4E00-\u9FA5]+$/.test(value) || /^[a-zA-Z]+$/.test(value),
      {
        message: "名稱只能包含字符，不能包含特殊符號",
      }
    ),
  from_mail: z
    .string()
    .min(1, { message: "email為必填欄位" })
    .refine((value) => validator.isEmail(value), "請輸入有效的電子郵件"),
  to_name: z.string(),
  to_mail: z.string().email(),
  message: z.string().min(1),
});

export type Email = z.infer<typeof EmailSchema>;

export async function sendEmail(data: Email) {
  const result = await emailjs.send(
    import.meta.env.VITE_EMAIL_SERVICE_ID,
    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    data,
    import.meta.env.VITE_EMAIL_PUBLIC_ID
  );
  const { status, text } = result;
  if (status === 200) {
    return `郵件寄送:${text}`;
  } else {
    throw new Error(text);
  }
}

export function compileOrderLinkMail(name: string, url: string, id: string) {
  const template = Handlebars.compile(orderLinkMail);
  const htmlBody = template({ name, url, id });
  return htmlBody;
}
