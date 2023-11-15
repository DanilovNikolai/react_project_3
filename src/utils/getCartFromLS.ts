import { CartItemProps } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const currentUserData = localStorage.getItem("currentUser");
  const cartData = localStorage.getItem("cart");

  if (currentUserData) {
    const currentUser = JSON.parse(currentUserData);
    const cart = currentUser.cart || [];
    const totalPrice = calcTotalPrice(cart);

    return {
      items: cart as CartItemProps[],
      totalPrice,
    };
  } else if (cartData) {
    const cart = JSON.parse(cartData);
    const totalPrice = calcTotalPrice(cart);

    return {
      items: cart as CartItemProps[],
      totalPrice,
    };
  } else {
    return {
      items: [] as CartItemProps[],
      totalPrice: 0,
    };
  }
};
