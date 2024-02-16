import { signIn, signOut, checkUser } from "./adim/login";
import { getAdminProducts, uploadImage } from "./adim/products";
import { getAllCoupons } from "./adim/coupon";
const apiPath: string = import.meta.env.VITE_API_PATH;

export const api = {
  auth: {
    signIn,
    signOut,
    checkUser,
  },
  admin: {
    getAdminProducts: getAdminProducts(apiPath),
    getAllCoupons: getAllCoupons(apiPath),
    uploadImage: uploadImage(apiPath),
  },
};
