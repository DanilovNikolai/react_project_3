import { CartItemProps } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("currentUser");
  const cart = data ? JSON.parse(data).cart : [];
  const totalPrice = calcTotalPrice(cart);

  return {
    items: cart as CartItemProps[],
    totalPrice,
  };
};
