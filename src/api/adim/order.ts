import axios from "axios";
import { z } from "zod";
import { OrderSchema } from "@/components/front/OrderForm";
import { sendEmail } from "@/lib/email";
import { UploadSuccessSchema } from "./products";

const AddOrderSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  total: z.number(),
  create_at: z.number(),
  orderId: z.string(),
});

const OrderWithIdSchema = z.object({
  id: z.string(),
  create_at: z.number(),
  is_paid: z.boolean(),
  message: z.any(),
  products: z.record(
    z.string(),
    z.object({
      id: z.string(),
      product_id: z.string(),
      qty: z.coerce.number(),
    })
  ),
  user: z.object({
    address: z.string(),
    email: z.string(),
    name: z.string(),
    tel: z.string(),
  }),
  num: z.number(),
});

const getOrderSchema = z.object({
  success: z.boolean(),
  orders: z.array(OrderWithIdSchema), 
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    has_pre: z.boolean(),
    has_next: z.boolean(),
    category: z.string(),
  }),
  messages: z.array(z.any()),
});
export type OrderColums = z.infer<typeof getOrderSchema>["orders"][0];
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

    ////htmlbody payload to long...
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

export function getOrders(apiPath: string) {
  return async () => {
    const response = await axios<z.infer<typeof getOrderSchema>>({
      url: `/v2/api/${apiPath}/admin/orders`,
      method: "GET",
    });

    console.log(response.data);
    const validate = getOrderSchema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function deleteOrder(apiPath: string) {
  return async (id: string) => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/order/${id}`,
      method: "DELETE",
    });
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function getOrderWithId(apiPath: string) {
  return async (id: string) => {
    const response = await axios<z.infer<typeof OrderWithIdSchema>>({
      url: `/v2/api/${apiPath}/order/${id}`,
      method: "GET",
    });
    const validate = OrderWithIdSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
