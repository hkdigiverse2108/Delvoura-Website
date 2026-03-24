import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ScentItem } from "../../Types";

type ScentState = {
  items: ScentItem[];
};

const initialState: ScentState = {
  items: [],
};

const scentSlice = createSlice({
  name: "scent",
  initialState,
  reducers: {
    setScents: (state, action: PayloadAction<ScentItem[]>) => {
      state.items = action.payload ?? [];
    },
  },
});

export const { setScents } = scentSlice.actions;
export default scentSlice.reducer;
