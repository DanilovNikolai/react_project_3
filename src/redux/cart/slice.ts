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
      const foundItemById = state.items?.find(
        (item) => item.id === action.payload.id
      );
      const foundItemByType = foundItemById?.type === action.payload.type;
      const foundItemBySize = foundItemById?.size === action.payload.size;

      if (foundItemById && foundItemByType && foundItemBySize) {
        foundItemById.count++;
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
      const foundItemById = state.items?.find(
        (item) => item.id === action.payload.id
      );
      const foundItemByType = foundItemById?.type === action.payload.type;
      const foundItemBySize = foundItemById?.size === action.payload.size;

      state.items = state.items.filter((item) => {
        if (foundItemById && foundItemByType && foundItemBySize) {
          return item.id !== action.payload.id;
        }
      });
      state.totalPrice = calcTotalPrice(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    minusItem(state, action: PayloadAction<CartItemProps>) {
      const foundItemById = state.items?.find(
        (item) => item.id === action.payload.id
      );
      if (foundItemById) {
        foundItemById.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    plusItem(state, action: PayloadAction<CartItemProps>) {
      const foundItemById = state.items?.find(
        (item) => item.id === action.payload.id
      );
      if (foundItemById) {
        foundItemById.count++;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem, plusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
