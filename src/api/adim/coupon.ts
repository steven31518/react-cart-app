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
export const CouponRequestSchema = NewCouponSchema.omit({
  due_date: true,
}).extend({
  due_date: z.number(),
});
export type CouponRequest = z.infer<typeof CouponRequestSchema>;
export type GetCouponResponse = z.infer<typeof getCouponSchema>;
const CouponUseSchema = UploadSuccessSchema.extend({
  data: z.object({
    final_total: z.number(),
  }),
});

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
  return async (data: CouponRequest) => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/coupon`,
      method: "POST",
      data: { data },
    });
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function editCoupon(apiPath: string) {
  return async (data: CouponRequest, id: string) => {
    const response = await axios<z.infer<typeof UploadSuccessSchema>>({
      url: `/v2/api/${apiPath}/admin/coupon/${id}`,
      method: "PUT",
      data: { data },
    });
    
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function deleteCoupon(apiPath: string) {
  return async (id: string) => {
    const response = await axios.delete(
      `/v2/api/${apiPath}/admin/coupon/${id}`
    );
    const validate = UploadSuccessSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

export function userCoupon(apiPath: string) {
  return async (data: Record<"data", { code: string }>) => {
    const response = await axios<z.infer<typeof CouponUseSchema>>({
      url: `/v2/api/${apiPath}/coupon`,
      method: "POST",
      data: data,
    });
   
    const validate = CouponUseSchema.safeParse(response.data);
    if (!validate.success) {
      throw new Error(validate.error.message);
    }
    return validate.data;
  };
}

