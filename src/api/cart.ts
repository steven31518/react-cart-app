import axios from "axios";
import { z } from "zod";
import { ProductSchema } from "./adim/products";


export type PostCart = {
  data: {
    product_id: string;
    qty: number;
  };
};
const AddCartSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    product_id: z.string(),
    qty: z.number(),
    total: z.number(),
    final_total: z.number(),
    product: ProductSchema,
  }),
});
const PutCartSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    product_id: z.string(),
    qty: z.number(),
  }),
});

const GetCartSchema = z.object({
  data: z.object({
    carts: z.array(
      z.object({
        coupon: z
          .object({
            code: z.string(),
            due_date: z.number(),
            id: z.string(),
            is_enabled: z.number(),
            percent: z.number(),
            title: z.string(),
          })
          .or(z.undefined()),
        final_total: z.number().transform((p) => p.toFixed(0)),
        id: z.string(),
        product: ProductSchema,
        product_id: z.string(),
        qty: z.number(),
        total: z.number(),
      })
    ),
    total: z.number(),
    final_total: z.number().transform((p) => p.toFixed(0)),
  }),
  success: z.boolean(),
  messages: z.array(z.string()),
});

export const postToCart = (apiPath: string) => {
  return async (data: PostCart) => {
    const response = await axios<z.infer<typeof AddCartSchema>>({
      url: `/v2/api/${apiPath}/cart`,
      method: "POST",
      data: data,
    });
    const validate = AddCartSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};

export const getCart = (apiPath: string) => {
  return async () => {
    const response = await axios<z.infer<typeof GetCartSchema>>({
      url: `/v2/api/${apiPath}/cart`,
      method: "GET",
    });
    const validate = GetCartSchema.safeParse(response.data);
    if (!validate.success) {
      console.log(validate.error.message);
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};

export const putCart = (apiPath: string) => {
  return async (data: PostCart) => {
    const response = await axios<z.infer<typeof PutCartSchema>>({
      url: `/v2/api/${apiPath}/cart/${data.data.product_id}`,
      method: "PUT",
      data: data,
    });
    const validate = PutCartSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};
