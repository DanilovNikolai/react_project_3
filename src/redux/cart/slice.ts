import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items?.find((item) => {
        return item.id === action.payload.id;
      });

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
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const foundItem = state.items?.find(
        (item) => item.id === action.payload.id
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
