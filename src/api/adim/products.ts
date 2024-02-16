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
