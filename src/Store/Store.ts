import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import productReducer from "./Slices/ProductSlice";
import scentReducer from "./Slices/ScentSlice";
import seasonReducer from "./Slices/SeasonSlice";
import addressReducer from "./Slices/AddressSlice";
import orderReducer from "./Slices/OrderSlice";
import settingsReducer from "./Slices/SettingsSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    scent: scentReducer,
    season: seasonReducer,
    address: addressReducer,
    order: orderReducer,
    settings: settingsReducer,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
