import { configureStore } from "@reduxjs/toolkit";
// import { Store } from "redux";
import filter from "./filter/slice";
import cart from "./cart/slice";
import items from "./items/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    items,
    filter,
    cart,
  },
});

// Типизируем глобальный state
export type RootState = ReturnType<typeof store.getState>;

// Типизируем useDispatch
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
