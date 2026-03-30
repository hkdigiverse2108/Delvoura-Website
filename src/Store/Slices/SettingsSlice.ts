import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsItem } from "../../Types";

export type SettingsState = {
  item: SettingsItem | null;
};

const initialState: SettingsState = {
  item: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsItem | null>) => {
      state.item = action.payload ?? null;
    },
    clearSettings: (state) => {
      state.item = null;
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
