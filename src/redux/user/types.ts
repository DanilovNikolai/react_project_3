import { CartItemProps } from "redux/cart/types";

export type userOrder = {
  date: string;
  time: string;
  numberOfOrder: string;
  totalPrice: number;
  bonusForOrder: number;
  items: CartItemProps[];
};

export interface userSliceState {
  username: string | null | undefined;
  email: string;
  token: string;
  id: string;
  cart: [];
  bonus: number;
  orders: userOrder[];
}
