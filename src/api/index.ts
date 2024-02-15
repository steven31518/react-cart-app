import { signIn, signOut, checkUser } from "./adim/login";

export const api = {
  auth: {
    signIn,
    signOut,
    checkUser,
  },
};
