import { signIn, signOut, checkUser } from "./adim/login";
import {
  getAdminProducts,
  getAdminPageProducts,
  uploadImage,
  updateProduct,
  addProduct,
  deleteProduct,
  getClientPageProducts,
  getProductWithId,
} from "./adim/products";
import { getAllCoupons } from "./adim/coupon";
import {
  postToCart,
  getCart,
  putCart,
  deleteCartItem,
  deleteCart,
} from "./cart";
const apiPath: string = import.meta.env.VITE_API_PATH;

export const api = {
  auth: {
    signIn,
    signOut,
    checkUser,
  },
  admin: {
    getAdminProducts: getAdminProducts(apiPath),
    getAdminPageProducts: getAdminPageProducts(apiPath),
    getAllCoupons: getAllCoupons(apiPath),
    uploadImage: uploadImage(apiPath),
    updateProduct: updateProduct(apiPath),
    addProduct: addProduct(apiPath),
    deleteProduct: deleteProduct(apiPath),
  },
  client: {
    getClientPageProducts: getClientPageProducts(apiPath),
    getProductWithId: getProductWithId(apiPath),
    postToCart: postToCart(apiPath),
    getCart: getCart(apiPath),
    putCart: putCart(apiPath),
    deleteCartItem: deleteCartItem(apiPath),
    deleteCart: deleteCart(apiPath),
  },
};
