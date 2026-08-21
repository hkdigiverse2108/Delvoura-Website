import { useEffect, useMemo, useState } from "react";
import { HeartFilled, HeartOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { ProductItem } from "../../Types";
import { useWishlist } from "../../Utils/Hooks";

type ProductGalleryProps = {
  product?: ProductItem | null;
};

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const images = useMemo(() => {
    const cover = product?.coverimage || "";
    const list = product?.images?.length ? product.images : [];
    const merged = cover ? [cover, ...list] : list;
    return merged.length ? Array.from(new Set(merged)) : [];
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const productId = product?._id || (product as any)?.id || "";
  const inWishlist = isInWishlist(productId);

  // Calculate discount
  const firstVariant = (product?.variants?.[0] as any);
  const rawPrice = typeof firstVariant === "object" ? firstVariant?.price ?? firstVariant?.mrp ?? product?.price ?? product?.mrp ?? 0 : product?.price ?? product?.mrp ?? 0;
  const rawMrp = typeof firstVariant === "object" ? firstVariant?.mrp ?? product?.mrp ?? 0 : product?.mrp ?? 0;
  const price = Number(rawPrice) || 0;
  const mrp = Number(rawMrp) || 0;
  const discountPercent = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

  if (!images.length) {
    return (
      <div className="delvoura-product-gallery">
        <div className="delvoura-product-main" />
      </div>
    );
  }

  return (
    <div className="delvoura-product-gallery">
      <div className="delvoura-product-thumbs">
        {images.map((img, idx) => (
          <button
            type="button"
            key={`${img}-${idx}`}
            className={`delvoura-product-thumb ${idx === activeIndex ? "is-active" : ""}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`View image ${idx + 1}`}
          >
            <img src={img} alt={`${product?.name || "Product"} thumbnail ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="delvoura-product-main relative overflow-hidden group">
        {/* Top Badges */}
        {product?.gender && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-white/95 backdrop-blur-sm text-[#111111] text-xs font-bold uppercase px-3 py-1 rounded shadow-sm border border-black/10 tracking-wider">
              {product.gender}
            </span>
          </div>
        )}

        {/* Top Right Action & Badges (Trending / Featured / Wishlist) */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {product?.isTrending && (
            <span
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center text-sm shadow-md"
              title="Trending Product"
            >
              🔥
            </span>
          )}
          {product?.isFeatured && (
            <span
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center text-sm shadow-md"
              title="Featured Product"
            >
              ⭐
            </span>
          )}
          {/* Wishlist Button */}
          {product && (
            <button
              type="button"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                inWishlist
                  ? "bg-white text-red-500 scale-105"
                  : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-500"
              }`}
              onClick={(e) => toggleWishlist(product, e)}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
            >
              {inWishlist ? (
                <HeartFilled style={{ fontSize: 18 }} />
              ) : (
                <HeartOutlined style={{ fontSize: 18 }} />
              )}
            </button>
          )}
        </div>

        {/* Offer Highlight Badge on page image (Point 12) */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-[#2e7d32] text-white text-xs font-bold px-3 py-1 rounded-sm shadow-md">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        <button
          type="button"
          className="delvoura-gallery-nav delvoura-gallery-nav-left"
          aria-label="Previous image"
          onClick={handlePrev}
        >
          <LeftOutlined />
        </button>
        <img src={activeImage} alt={product?.name || "Product"} className="w-full h-full object-contain" />
        <button
          type="button"
          className="delvoura-gallery-nav delvoura-gallery-nav-right"
          aria-label="Next image"
          onClick={handleNext}
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
