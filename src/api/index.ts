import { signIn, signOut, checkUser } from "./adim/login";
import {
  getAdminProducts,
  uploadImage,
  updateProduct,
  addProduct,
  deleteProduct,
} from "./adim/products";
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
    updateProduct: updateProduct(apiPath),
    addProduct: addProduct(apiPath),
    deleteProduct: deleteProduct(apiPath),
  },
};
