import { RootState } from "../store";
import { CartItemProps } from "./types";
// Используем библиотеку 'reselect', чтобы не создавалось 2 одинаковых селектора
import { createSelector } from "reselect";

const selectCartSlice = (state: RootState) => state.cart;

// Мемоизируем селектор 'cart', иначе items в корзине распределяются некорректно
export const selectCart = createSelector([selectCartSlice], (cart) => cart);

export const selectCartItemById = (id: string) =>
  createSelector([selectCartSlice], (cart) => {
    const items = cart.items;
    return items ? items.filter((item: CartItemProps) => item.id === id) : [];
  });
