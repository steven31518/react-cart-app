import { z } from "zod";
import axios from "axios";
import { FileWithPath } from "react-dropzone";

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
const uploadSuccessSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type Product = z.infer<typeof getProductSchema>["products"]["string"];
export type NewProduct = Omit<Product, "id">;

export type AddNewProduct = Record<"data", NewProduct>;
//{data:{},id:string}
export interface UploadProduct extends AddNewProduct {
  id: string;
}

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

const uploadImageSchema = z.object({
  success: z.boolean(),
  imageUrl: z.string(),
});
export const uploadImage = (apiPath: string) => {
  return async (files: FileWithPath[]) => {
    const data = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios<z.infer<typeof uploadImageSchema>>({
          url: `/v2/api/${apiPath}/admin/upload`,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return res.data;
      })
    );
    const validate = z.array(uploadImageSchema).safeParse(data);

    if (!validate.success) throw new Error(validate.error.message);

    return data;
  };
};

export const addProduct = (apiPath: string) => {
  return async (product: AddNewProduct) => {
    const response = await axios<z.infer<typeof uploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/product`,
      method: "POST",
      data: product,
    });
    const validate = uploadSuccessSchema.safeParse(response.data);
    if (!validate.success) throw new Error(validate.error.message);
    return response.data;
  };
};
export const updateProduct = (apiPath: string) => {
  return async (product: UploadProduct) => {
    const { id } = product;

    const response = await axios<z.infer<typeof uploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/product/${id}`,
      method: "PUT",
      data: product,
    });
    const validate = uploadSuccessSchema.safeParse(response.data);
    if (!validate.success) throw new Error(validate.error.message);
    return response.data;
  };
};

export const deleteProduct = (apiPath: string) => {
  return async (id: string) => {
    const response = await axios<z.infer<typeof uploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/product/${id}`,
      method: "DELETE",
    });
    const validate = uploadSuccessSchema.safeParse(response.data);
    if (!validate.success) throw new Error(validate.error.message);
    return response.data;
  };
};
