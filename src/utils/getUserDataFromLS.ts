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
      bonus: user.bonus || 0,
      orders: user.orders || [],
    };
  }

  return {
    username: "",
    email: "",
    token: "",
    id: "",
    cart: [],
    bonus: 0,
    orders: [],
  };
};
