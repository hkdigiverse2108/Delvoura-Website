import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SeasonItem } from "../../Types";

type SeasonState = {
  items: SeasonItem[];
};

const initialState: SeasonState = {
  items: [],
};

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    setSeasons: (state, action: PayloadAction<SeasonItem[]>) => {
      state.items = action.payload ?? [];
    },
  },
});

export const { setSeasons } = seasonSlice.actions;
export default seasonSlice.reducer;
