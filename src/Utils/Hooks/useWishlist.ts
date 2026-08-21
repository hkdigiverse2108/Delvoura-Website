import { useEffect } from "react";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { addToWishlist, removeFromWishlist, syncWishlist, toggleWishlist } from "../../Store/Slices/WishlistSlice";
import type { ProductItem } from "../../Types";

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  useEffect(() => {
    const handleStorage = () => {
      dispatch(syncWishlist());
    };
    window.addEventListener("delvoura-wishlist-updated", handleStorage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("delvoura-wishlist-updated", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [dispatch]);

  const isInWishlist = (productId?: string) => {
    if (!productId) return false;
    return wishlistItems.some((item) => (item._id || (item as any).id) === productId);
  };

  const handleToggleWishlist = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const id = product._id || (product as any).id;
    if (!id) return;
    const exists = isInWishlist(id);
    dispatch(toggleWishlist(product));
    if (exists) {
      message.info({ content: "Removed from wishlist", duration: 1.2 });
    } else {
      message.success({ content: "Added to wishlist", duration: 1.2 });
    }
  };

  const handleRemoveFromWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    dispatch(removeFromWishlist(productId));
    message.info({ content: "Removed from wishlist", duration: 1.2 });
  };

  const handleAddToWishlist = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    dispatch(addToWishlist(product));
    message.success({ content: "Added to wishlist", duration: 1.2 });
  };

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isInWishlist,
    toggleWishlist: handleToggleWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    addToWishlist: handleAddToWishlist,
  };
};
