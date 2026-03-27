import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddressItem } from "../../Types";

export type AddressState = {
  items: AddressItem[];
};

const initialState: AddressState = {
  items: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action: PayloadAction<AddressItem[]>) => {
      state.items = action.payload;
    },
    addAddress: (state, action: PayloadAction<AddressItem>) => {
      state.items = [action.payload, ...state.items];
    },
    updateAddress: (state, action: PayloadAction<AddressItem>) => {
      const index = state.items.findIndex((item) => item._id && item._id === action.payload._id);
      if (index >= 0) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearAddresses: (state) => {
      state.items = [];
    },
  },
});

export const { setAddresses, addAddress, updateAddress, removeAddress, clearAddresses } = addressSlice.actions;
export default addressSlice.reducer;
