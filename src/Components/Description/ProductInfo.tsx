import { useEffect, useState } from "react";
import { Button } from "antd";
import { InfoCircleOutlined, ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { ProductItem } from "../../Types";
import { useAddToCart } from "../../Utils/Hooks";

type ProductInfoProps = {
  product?: ProductItem | null;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [showInspired, setShowInspired] = useState(false);
  const addToCart = useAddToCart();
  const navigate = useNavigate();

  const normalizeHtml = (value?: string) => {
    if (!value) return "";
    return value.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
  };

  useEffect(() => {
    const firstVariant = (product?.variants?.[0] as any);
    const firstSize = typeof firstVariant === "object" ? firstVariant?.size : firstVariant;
    setSelectedVariant(firstSize || "");
    setQuantity(1);
  }, [product]);

  const variants = product?.variants?.length ? product.variants : [];
  const selected = variants.find((v) => (typeof v === "object" ? v.size : v) === selectedVariant) || variants[0];
  const rawPrice = typeof selected === "object" ? selected?.price ?? selected?.mrp ?? product?.price ?? product?.mrp ?? 0 : product?.price ?? product?.mrp ?? 0;
  const rawMrp = typeof selected === "object" ? selected?.mrp ?? product?.mrp ?? 0 : product?.mrp ?? 0;
  const price = Number(rawPrice) || 0;
  const mrp = Number(rawMrp) || 0;
  
  const saving = mrp > price ? mrp - price : 0;
  const discountPercent = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const prepaidPrice = (price * 0.9).toFixed(2); // 10% prepaid discount preview

  const rating = Number(product?.ratingSummary?.avgRating || 4.7).toFixed(1);
  const ratingCount = product?.ratingSummary?.ratingCount || 0;

  //============== Handle Scroll to Reviews (Point 9 & 13) ==============
  const handleScrollToReviews = () => {
    const el = document.getElementById("product-reviews-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  //============== Handle Add To Cart ==============
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product,
      selectedVariant,
      quantity,
      image: product.coverimage || product.images?.[0] || "",
    });
  };

  //============== Handle Buy Now (Point 14) ==============
  const handleBuyNow = () => {
    if (!product) return;
    addToCart({
      product,
      selectedVariant,
      quantity,
      image: product.coverimage || product.images?.[0] || "",
    });
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="delvoura-product-info">
      {/* HEADER BLOCK */}
      <div className="delvoura-info-block delvoura-info-header">
        <div className="delvoura-product-badges mb-2.5 flex flex-wrap items-center gap-2">
          {product?.gender && (
            <span className="bg-gray-100 text-gray-800 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm border border-gray-200 tracking-wider">
              {product.gender}
            </span>
          )}
          {product?.isTrending && (
            <span className="bg-orange-50 text-orange-600 border border-orange-200 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
              🔥 Trending
            </span>
          )}
          {product?.isFeatured && (
            <span className="bg-amber-50 text-amber-600 border border-amber-200 text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm flex items-center gap-1">
              ⭐ Featured
            </span>
          )}
        </div>

        <h1 className="delvoura-product-title text-2xl md:text-3xl font-medium tracking-tight text-[var(--color-text)] mb-1">
          {product?.name || "Product"}
        </h1>
        <p className="delvoura-product-subtitle text-sm text-[var(--color-text-muted)] mb-3">
          {product?.title || "Eau De Parfum - Luxury Fragrance"}
        </p>

        {/* REVIEW BADGE WITH CLICK EVENT (Point 9 & 13) */}
        <div
          className="inline-flex items-center gap-2 cursor-pointer bg-amber-50 hover:bg-amber-100 transition-colors px-3 py-1.5 rounded-md border border-amber-200 w-fit"
          onClick={handleScrollToReviews}
          role="button"
          tabIndex={0}
          title="Click to view reviews"
        >
          <span className="text-amber-600 font-bold text-sm">★ {rating}</span>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700 underline underline-offset-2">
            {ratingCount} {ratingCount === 1 ? "review" : "reviews"}
          </span>
        </div>
      </div>

      <div className="delvoura-info-divider" />

      {/* PRICE & DISCOUNT BLOCK (Point 13) */}
      <div className="delvoura-info-block">
        <div className="delvoura-product-price-row flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-bold text-[var(--color-text)]">
            ₹{price.toFixed(2)}
          </span>
          {Boolean(mrp && mrp > price) && (
            <span className="text-lg text-[var(--color-text-muted)] line-through">
              ₹{mrp.toFixed(2)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-sm font-semibold text-[#2e7d32] bg-green-50 border border-green-200 px-2 py-0.5 rounded">
              (Save {discountPercent}%)
            </span>
          )}
        </div>

        <div className="delvoura-product-tax text-xs text-[var(--color-text-muted)] mb-3">
          Inclusive of all taxes
        </div>

        {/* PREPAID DISCOUNT STRIP (Point 13) */}
        <div className="flex items-center gap-2 text-xs bg-[var(--color-card)] border border-[var(--color-border)] p-2.5 rounded-lg text-[var(--color-text)]">
          <span className="text-amber-600">🛡️</span>
          <span>
            Pay only <strong>₹{prepaidPrice}</strong> with Prepaid Discounts
          </span>
          <InfoCircleOutlined className="text-gray-400 text-xs ml-auto" />
        </div>
      </div>

      <div className="delvoura-info-divider" />

      {/* SIZES & VARIANTS */}
      {variants.length > 0 && (
        <div className="delvoura-info-block">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Select Size
          </label>
          <div className="delvoura-product-sizes flex flex-wrap gap-2">
            {variants.map((variant) => {
              const label = typeof variant === "object" ? variant.size : variant;
              return (
                <button
                  key={label}
                  type="button"
                  className={`delvoura-size-btn px-4 py-2 text-sm border rounded-md font-medium transition-all ${
                    selectedVariant === label
                      ? "bg-[#111111] text-white border-[#111111]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setSelectedVariant(label || "")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ACTIONS: QUANTITY, ADD TO CART & BUY NOW (Point 14) */}
      <div className="delvoura-info-block">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {/* Quantity Selector */}
          <div className="delvoura-qty-control flex items-center border border-gray-300 rounded-md bg-white w-fit h-12">
            <button
              type="button"
              className="delvoura-qty-btn px-3.5 h-full text-base font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="delvoura-qty-value px-4 font-semibold text-sm min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              className="delvoura-qty-btn px-3.5 h-full text-base font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add To Cart Button */}
          <Button
            type="default"
            className="flex-1 !h-12 !text-base font-semibold flex items-center justify-center gap-2 !border-[#111111] !text-[#111111] hover:!bg-gray-50 !rounded-md"
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined /> Add To Cart
          </Button>

          {/* Buy Now Button (Point 14) */}
          <Button
            type="primary"
            className="flex-1 !h-12 !text-base font-semibold flex items-center justify-center gap-2 !bg-[#111111] !text-white hover:!opacity-90 !rounded-md"
            onClick={handleBuyNow}
          >
            <ThunderboltOutlined /> Buy Now
          </Button>
        </div>
      </div>

      <div className="delvoura-info-divider" />

      {/* HIGHLIGHT BADGES BAR (Point 13) */}
      <div className="delvoura-info-block">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-center text-xs text-[var(--color-text)]">
          <div className="flex flex-col items-center gap-1.5 p-2 bg-[var(--color-card)] rounded-md">
            <span className="text-xl">🌐</span>
            <span className="font-medium">Imported Oils</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 bg-[var(--color-card)] rounded-md">
            <span className="text-xl">🐰</span>
            <span className="font-medium">Cruelty-Free</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 bg-[var(--color-card)] rounded-md">
            <span className="text-xl">📜</span>
            <span className="font-medium">IFRA Certified</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-2 bg-[var(--color-card)] rounded-md">
            <span className="text-xl">📦</span>
            <span className="font-medium">Assured Delivery</span>
          </div>
        </div>
      </div>

      {/* SCENT STORY & INGREDIENTS */}
      {((product?.ingredients && product.ingredients.length > 0) || product?.scentStory) && (
        <>
          <div className="delvoura-info-divider" />
          <div className="delvoura-info-block">
            {product?.ingredients && product.ingredients.length > 0 && (
              <div className="delvoura-product-tags mb-3 flex flex-wrap gap-1.5">
                {product.ingredients.map((tag) => (
                  <span
                    key={tag}
                    className="delvoura-product-tag text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {product?.scentStory && (
              <div className="delvoura-product-inspired text-sm text-[var(--color-text-muted)]">
                <span>
                  Inspired by <strong>{product?.name || "Delvoura"}</strong>
                </span>
                <div
                  className={`delvoura-html delvoura-inspired-text mt-2 ${
                    showInspired ? "is-open" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: normalizeHtml(product.scentStory) }}
                />
                <button
                  type="button"
                  className="delvoura-inspired-toggle text-xs font-semibold text-[var(--color-accent)] mt-1 underline"
                  onClick={() => setShowInspired((prev) => !prev)}
                >
                  {showInspired ? "Read less" : "Read more"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
