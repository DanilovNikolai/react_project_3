import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// axios
import axios from "axios";
import { ItemsSliceState, Pizza, Status } from "./types";

export const initialState: ItemsSliceState = {
  items: [],
  status: Status.LOADING, // 'loading' | 'success' | 'error'
};

// Функция запроса items с бэк-энда через создание асинхронного экшена
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, sort, search, currentPage, itemsPerPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64f8cba7824680fd21800fd6.mockapi.io/pizzas?page=${currentPage}&limit=${itemsPerPage}&${category}&${sort}&${search}`
    );

    return data;
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },

  //* 2ой вариант записи extraReducers (если не нужен TypeScript)
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = itemsSlice.actions;
export default itemsSlice.reducer;
