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
import {
  getAllCoupons,
  createCoupon,
  editCoupon,
  deleteCoupon,
  userCoupon,
} from "./adim/coupon";
import {
  postToCart,
  getCart,
  putCart,
  deleteCartItem,
  deleteCart,
} from "./cart";
import { addOrder } from "./adim/order";
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
    uploadImage: uploadImage(apiPath),
    updateProduct: updateProduct(apiPath),
    addProduct: addProduct(apiPath),
    deleteProduct: deleteProduct(apiPath),
    getAllCoupons: getAllCoupons(apiPath),
    createCoupon: createCoupon(apiPath),
    editCoupon: editCoupon(apiPath),
    deleteCoupon: deleteCoupon(apiPath),
  },
  client: {
    getClientPageProducts: getClientPageProducts(apiPath),
    getProductWithId: getProductWithId(apiPath),
    postToCart: postToCart(apiPath),
    getCart: getCart(apiPath),
    putCart: putCart(apiPath),
    deleteCartItem: deleteCartItem(apiPath),
    deleteCart: deleteCart(apiPath),
    userCoupon: userCoupon(apiPath),
    addOrder: addOrder(apiPath),
  },
};
