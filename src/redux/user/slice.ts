import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// types
import { userSliceState } from "./types";
// utils
import { getUserDataFromLS } from "utils/getUserDataFromLS";

export const initialState: userSliceState = getUserDataFromLS();

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userSliceState>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.username = null;
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setBonus(state, action) {
      state.bonus = action.payload;
    },
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const { setUser, removeUser, setBonus, addOrder } = userSlice.actions;
export default userSlice.reducer;
