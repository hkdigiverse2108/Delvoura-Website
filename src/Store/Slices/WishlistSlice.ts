import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../Constants";
import type { ProductItem } from "../../Types";

const loadWishlistFromStorage = (): ProductItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items: ProductItem[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(items));
    window.dispatchEvent(new Event("delvoura-wishlist-updated"));
  } catch {
    // ignore
  }
};

type WishlistState = {
  items: ProductItem[];
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductItem>) => {
      const id = action.payload._id || (action.payload as any).id;
      if (!id) return;
      const exists = state.items.some((item) => (item._id || (item as any).id) === id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => (item._id || (item as any).id) !== action.payload);
      saveWishlistToStorage(state.items);
    },
    toggleWishlist: (state, action: PayloadAction<ProductItem>) => {
      const id = action.payload._id || (action.payload as any).id;
      if (!id) return;
      const index = state.items.findIndex((item) => (item._id || (item as any).id) === id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
    syncWishlist: (state) => {
      state.items = loadWishlistFromStorage();
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, syncWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
