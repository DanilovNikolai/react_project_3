import { CartItemProps } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItemProps[]) => {
  return items.reduce(
    (sum: number, item: any) => sum + item.price * item.count,
    0
  );
};
