import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import items from "./items/slice";
import user from "./user/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    items,
    filter,
    cart,
    user,
  },
});

// Типизируем глобальный state
export type RootState = ReturnType<typeof store.getState>;

// Типизируем useDispatch
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
