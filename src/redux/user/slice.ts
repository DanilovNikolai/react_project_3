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
    // addOrder(state, action) {
    //   const now = new Date();
    //   const date = now.toLocaleDateString("en-GB");
    //   const time = now.toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   });

    //   const userOrder = {
    //     date,
    //     time,
    //     number: "",
    //     totalPrice: calcTotalPrice(action.payload),
    //     order: action.payload,
    //   };

    //   state.orders.push(userOrder);
    //   localStorage.setItem("currentUser", JSON.stringify(state));
    // },
  },
});

export const { setUser, removeUser, setBonus } = userSlice.actions;
export default userSlice.reducer;
