import { RootState } from "../store";
import { CartItemProps } from "./types";
// Используем библиотеку 'reselect', чтобы не создавалось 2 одинаковых селектора
import { createSelector } from "reselect";

// Selector to get the 'cart' slice
const selectCartSlice = (state: RootState) => state.cart;

// Memoized selector for the 'cart' slice
export const selectCart = createSelector([selectCartSlice], (cart) => cart);

// Memoized selector to get cart items by ID
export const selectCartItemById = (id: string) =>
  createSelector([selectCartSlice], (cart) => {
    const items = cart.items;
    return items ? items.filter((item: CartItemProps) => item.id === id) : [];
  });
