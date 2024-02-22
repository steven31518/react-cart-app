import emailjs from "@emailjs/browser";
import Handlebars from "handlebars";
import { z } from "zod";
import { orderLinkMail } from "./emailTemplates/orderLinkMail";

const emailSchema = z.object({
  from_name: z.string().min(1),
  from_mail: z.string().email(),
  to_name: z.string(),
  to_mail: z.string().email(),
  message: z.string().min(1),
});

export type Email = z.infer<typeof emailSchema>;

export async function sendEmail(data: Email) {
  const result = await emailjs.send(
    import.meta.env.VITE_EMAIL_SERVICE_ID,
    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
    data,
    import.meta.env.VITE_EMAIL_PUBLIC_ID
  );
  const { status, text } = result;
  if (status === 200) {
    return text;
  } else {
    throw new Error(text);
  }
}

export function compileOrderLinkMail(name: string, url: string, id: string) {
  const template = Handlebars.compile(orderLinkMail);
  const htmlBody = template({ name, url, id });
  return htmlBody;
}
