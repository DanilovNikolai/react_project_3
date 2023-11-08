import { userSliceState } from "redux/user/types";

export const getUserDataFromLS = (): userSliceState => {
  const userData = localStorage.getItem("currentUser");
  const user = userData ? JSON.parse(userData) : null;

  if (user) {
    return {
      username: user.username || "",
      email: user.email || "",
      token: user.token || "",
      id: user.id || "",
      cart: user.cart || [],
    };
  }

  return {
    username: "",
    email: "",
    token: "",
    id: "",
    cart: [],
  };
};
