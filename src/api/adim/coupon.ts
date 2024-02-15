import axios from "axios";
import { z } from "zod";

const getCouponSchema = z.object({
  success: z.boolean(),
  coupons: z.array(
    z.object({
      code: z.string(),
      due_date: z.number(),
      id: z.string(),
      is_enabled: z.number(),
      num: z.number(),
      percent: z.number(),
      title: z.string(),
    })
  ),
  pagination: z.object({
    total_pages: z.number(),
    current_page: z.number(),
    has_pre: z.boolean(),
    has_next: z.boolean(),
    category: z.string(),
  }),
});

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
