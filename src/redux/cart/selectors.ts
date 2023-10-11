import { RootState } from "../store";
import { CartItemProps } from "./types";

export const selectCart = (state: RootState) => {
  console.log(state.cart.items);
  return state.cart;
};
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items?.filter((item: CartItemProps) => {
    return item.id === id;
  });
