import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userSliceState } from "./types";
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
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
