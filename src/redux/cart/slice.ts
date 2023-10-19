import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemProps, CartSliceState } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemProps>) {
      const { id, type, size } = action.payload;

      const foundItem = state.items?.find(
        (item) => item.id === id && item.type === type && item.size === size
      );

      if (foundItem) {
        foundItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItem(
      state,
      action: PayloadAction<{ id: string; type: string; size: number }>
    ) {
      const { id, type, size } = action.payload;

      state.items = state.items.filter(
        (item) => !(item.id === id && item.type === type && item.size === size)
      );
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    minusItem(state, action: PayloadAction<CartItemProps>) {
      const { id, type, size } = action.payload;

      const foundItem = state.items?.find(
        (item) => item.id === id && item.type === type && item.size === size
      );
      if (foundItem) {
        foundItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
