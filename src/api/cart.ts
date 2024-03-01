import axios from "axios";
import { z } from "zod";
import { ProductSchema } from "./adim/products";
import { UploadSuccessSchema } from "./adim/products";
import { UserSchema } from "@/components/front/OrderForm";
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
const PostOrder = z.object({
  success: z.boolean(),
  message: z.string(),
  total: z.number(),
  create_at: z.number(),
  orderId: z.string(),
});

export type Cart = z.infer<typeof GetCartSchema>["data"]["carts"][0];
type User = z.infer<typeof UserSchema>;
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
      data: {
        data: {
          product_id: data.data.product_id,
          qty: data.data.qty,
        },
      },
    });
    const validate = PutCartSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
};

export function deleteCartItem(apiPath: string) {
  return async (id: string) => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/cart/${id}`,
      method: "DELETE",
    });
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function deleteCart(apiPath: string) {
  return async () => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/carts`,
      method: "DELETE",
    });
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function postOrder(apiPath: string) {
  return async (data: User) => {
    const response = await axios<z.infer<typeof PostOrder>>({
      url: `/v2/api/${apiPath}/order`,
      method: "POST",
      data: { data },
    });
    const validate = PostOrder.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
