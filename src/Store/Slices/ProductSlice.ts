import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductState, SetProductsPayload } from "../../Types";

const initialState: ProductState = {
  list: {
    items: [],
    totalData: 0,
    state: null,
  },
  selected: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<SetProductsPayload>) => {
      state.list.items = action.payload.products ?? [];
      state.list.totalData = action.payload.totalData ?? 0;
      state.list.state = action.payload.state ?? null;
    },
    setProductById: (state, action: PayloadAction<ProductState["selected"]>) => {
      state.selected = action.payload ?? null;
    },
    // clearProducts: (state) => {
    //   state.list.items = [];
    //   state.list.totalData = 0;
    //   state.list.state = null;
    // },
    // clearProductById: (state) => {
    //   state.selected = null;
    // },
  },
});

export const { setProducts, setProductById } = productSlice.actions;
export default productSlice.reducer;
