import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderItem } from "../../Types";

export type OrderState = {
  items: OrderItem[];
};

const initialState: OrderState = {
  items: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderItem[]>) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.items = [action.payload, ...state.items];
    },
    updateOrder: (state, action: PayloadAction<OrderItem>) => {
      const index = state.items.findIndex((item) => item._id && item._id === action.payload._id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const { setOrders, addOrder, updateOrder, removeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
