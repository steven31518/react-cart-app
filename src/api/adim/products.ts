import { z } from "zod";
import axios from "axios";

const getProductSchema = z.object({
  success: z.boolean(),
  products: z.record(
    z.string(),
    z.object({
      category: z.string(),
      content: z.string(),
      description: z.string(),
      id: z.string(),
      is_enabled: z.number(),
      origin_price: z.number(),
      price: z.number(),
      title: z.string(),
      unit: z.string(),
      imageUrl: z.string(),
      imagesUrl: z.array(z.string()),
    })
  ),
});

export const getAdminProducts = (apiPath: string) => {
  return async () => {
    const response = await axios<z.infer<typeof getProductSchema>>({
      url: `/v2/api/${apiPath}/admin/products/all`,
      method: "GET",
    });
    const validate = getProductSchema.safeParse(response.data);
    if (!validate.success) throw new Error(validate.error.message);
    return validate.data;
  };
};
