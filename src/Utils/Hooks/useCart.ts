import { STORAGE_KEYS } from "../../Constants";

export type CartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image?: string;
};

const canUseStorage = () => typeof window !== "undefined";

export const readCart = (): CartItem[] => {
  if (!canUseStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeCart = (items: CartItem[]) => {
  if (!canUseStorage()) return;
  if (!items.length) {
    localStorage.removeItem(STORAGE_KEYS.CART);
  } else {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }
  window.dispatchEvent(new Event("delvoura-cart-updated"));
};

export const addToCart = (item: CartItem) => {
  const items = readCart();
  const idx = items.findIndex((i) => i.id === item.id && i.size === item.size);
  if (idx >= 0) {
    items[idx].qty += item.qty;
  } else {
    items.push(item);
  }
  writeCart(items);
};
