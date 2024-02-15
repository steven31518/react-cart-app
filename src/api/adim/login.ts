import axios from "axios";
import { z } from "zod";
import type { SignIn } from "@/components/LoginForm";

const signin_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
  uid: z.string(),
  token: z.string(),
  expired: z.number(),
});
const signOut_res_schema = z.object({
  success: z.boolean(),
  message: z.string(),
});

const check_res_schema = z.object({
  success: z.boolean(),
  uid: z.string(),
});

export type SignInResponse = z.infer<typeof signin_res_schema>;
export type CheckUserResponse = z.infer<typeof check_res_schema>;
export async function signIn(params: SignIn) {
  const response = await axios<SignInResponse>({
    url: "/v2/admin/signin",
    method: "POST",
    data: params,
  });
  const validate = signin_res_schema.safeParse(response.data);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
}

export async function signOut() {
  const response = await axios({
    url: "/v2/logout",
    method: "POST",
  });
  const validate = signOut_res_schema.safeParse(response.data);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
}

export async function checkUser() {
  const response = await axios<CheckUserResponse>({
    url: "/v2/api/user/check",
    method: "POST",
  });
  const validate = check_res_schema.safeParse(response.data);
  if (!validate.success) {
    throw new Error(validate.error.message);
  }
  return validate.data;
}
