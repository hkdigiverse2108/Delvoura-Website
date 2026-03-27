import { message } from "antd";
import type { ProductItem } from "../../Types";
import { addToCart } from "./useCart";

type AddToCartInput = {
  product?: ProductItem | null;
  selectedVariant?: string;
  quantity?: number;
  image?: string;
};

const getVariantLabel = (product?: ProductItem | null, selectedVariant?: string) => {
  if (selectedVariant) return selectedVariant;
  const first = product?.variants?.[0] as any;
  return typeof first === "object" ? first?.size || "50 ml" : first || "50 ml";
};

const getVariantPrice = (product?: ProductItem | null, variantLabel?: string) => {
  if (!product) return 0;
  const variants = product.variants as any[] | undefined;
  const selected = variants?.find((v) => (typeof v === "object" ? v.size : v) === variantLabel);
  if (selected && typeof selected === "object") return Number(selected?.price ?? selected?.mrp ?? product.price ?? 0);
  return Number(product.price ?? product.mrp ?? 0);
};

export const useAddToCart = () => {
  return (input: AddToCartInput) => {
    const product = input.product;
    if (!product) return;
    const size = getVariantLabel(product, input.selectedVariant);
    const price = getVariantPrice(product, size);
    addToCart({
      id: product._id || product.name || "item",
      name: product.name || "Item",
      size,
      price,
      qty: input.quantity ?? 1,
      image: input.image || product.coverimage || product.images?.[0] || "",
    });
    message.success({ content: "Added to cart", duration: 1.2 });
  };
};
