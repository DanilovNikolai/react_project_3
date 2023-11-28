import { CartItemProps } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItemProps[], bonus = 0) => {
  return items?.reduce(
    (sum: number, item: any) =>
      item ? sum + item.price * item.count - bonus : 0,
    0
  );
};
