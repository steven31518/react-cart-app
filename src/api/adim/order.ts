import axios from "axios";
import { z } from "zod";
import { OrderSchema } from "@/components/front/OrderForm";
import { sendEmail } from "@/lib/email";

const AddOrderSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  total: z.number(),
  create_at: z.number(),
  orderId: z.string(),
});

export type AddOrder = z.infer<typeof AddOrderSchema>;

export function addOrder(apiPath: string) {
  return async (data: z.infer<typeof OrderSchema>) => {
    const response = await axios<z.infer<typeof AddOrderSchema>>({
      url: `/v2/api/${apiPath}/order`,
      method: "POST",
      data: { data },
    });
    const validate = AddOrderSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    const baseUrl = import.meta.env.VITE_URL;

    // const body = compileOrderLinkMail(
    //   data.user.name,
    //   `${baseUrl}/order/${validate.data.orderId}`,
    //   validate.data.orderId
    // );

    const text = await sendEmail({
      message: `Hi,${data.user.name},非常感謝你的訂購。
             您的已成立訂單，請點擊以下連結查看訂單詳情：
            ${baseUrl}/order/${validate.data.orderId}`,
      from_name: "PARROT賣場測試-訂單成立",
      from_mail: "james31518@gmail.com",
      to_name: data.user.name,
      to_mail: data.user.email,
    });
    console.log(text);
    return validate.data;
  };
}
