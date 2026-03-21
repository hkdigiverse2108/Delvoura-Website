import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import productReducer from "./Slices/ProductSlice";

const Store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
