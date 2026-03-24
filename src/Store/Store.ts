import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import productReducer from "./Slices/ProductSlice";
import scentReducer from "./Slices/ScentSlice";
import seasonReducer from "./Slices/SeasonSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    scent: scentReducer,
    season: seasonReducer,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
