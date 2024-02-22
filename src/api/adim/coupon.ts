import axios from "axios";
import { z } from "zod";
import { CouponSchema, NewCouponSchema } from "@/components/admin/CouponForm";
import { UploadSuccessSchema } from "./products";

const getCouponSchema = z.object({
  success: z.boolean(),
  coupons: z.array(CouponSchema),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    has_pre: z.boolean(),
    has_next: z.boolean(),
    category: z.string(),
  }),
});
export type NewCoupon = z.infer<typeof NewCouponSchema>;

export type GetCouponResponse = z.infer<typeof getCouponSchema>;

export function getAllCoupons(apiPath: string) {
  return async () => {
    const response = await axios.get<GetCouponResponse>(
      `/v2/api/${apiPath}/admin/coupons`
    );
    const validate = getCouponSchema.safeParse(response.data);

    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function createCoupon(apiPath: string) {
  return async (data: z.infer<typeof NewCouponSchema>) => {
    const response = await axios.post<z.infer<typeof UploadSuccessSchema>>(
      `/v2/api/${apiPath}/admin/coupon`,
      data
    );
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function editCoupon(apiPath: string) {
  return async (data: z.infer<typeof NewCouponSchema>, id: string) => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/coupon/${id}`,
      method: "PUT",
      data: data,
    });
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}
