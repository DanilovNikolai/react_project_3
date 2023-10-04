import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce(
    (sum: number, item: any) => sum + item.price * item.count,
    0
  );
};
