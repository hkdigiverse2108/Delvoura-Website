 import { useEffect, useState } from "react";
import { Rate } from "antd";
import type { ProductItem } from "../../Types";
import { useAddToCart } from "../../Utils/Hooks";

type ProductInfoProps = {
  product?: ProductItem | null;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const addToCart = useAddToCart();

  useEffect(() => {
    const firstVariant = (product?.variants?.[0] as any);
    const firstSize = typeof firstVariant === "object" ? firstVariant?.size : firstVariant;
    setSelectedVariant(firstSize || "");
    setQuantity(1);
  }, [product]);

  const variants = product?.variants?.length ? product.variants : [];
  const selected = variants.find((v) => (typeof v === "object" ? v.size : v) === selectedVariant);
  const price = typeof selected === "object" ? selected?.price ?? product?.price ?? 0 : product?.price ?? 0;
  const mrp = typeof selected === "object" ? selected?.mrp ?? product?.mrp : product?.mrp;
  
  //============== Handle Add To Cart (Product Detail) ==============
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product,
      selectedVariant,
      quantity,
      image: product.coverimage || product.images?.[0] || "",
    });
  };

  return (
    <div className="delvoura-product-info">
      <div className="delvoura-info-block delvoura-info-header">
        <div className="delvoura-product-badges">
          {product?.gender && <span className="delvoura-product-badge">{product.gender}</span>}
        </div>

        <h1 className="delvoura-product-title">{product?.name || "Product"}</h1>
        <p className="delvoura-product-subtitle">{product?.title || "Eau De Parfum"}</p>

        <div className="delvoura-product-rating">
          <Rate disabled value={Number(product?.ratingSummary?.avgRating || 0)} />
          <span>({product?.ratingSummary?.ratingCount || 0})</span>
        </div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-tags">
          {(product?.ingredients || []).map((tag) => (
            <span key={tag} className="delvoura-product-tag">{tag}</span>
          ))}
        </div>

        <div className="delvoura-product-highlights">
          {!!product?.scentStory && <span className="delvoura-highlight-pill">Scent Story</span>}
          {!!product?.usageTips && <span className="delvoura-highlight-pill">Usage Tips</span>}
        </div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-inspired">
          {product?.scentStory ? (
            <>Inspired by <strong>{product.scentStory}</strong></>
          ) : (
            <>Inspired by <strong>{product?.name || "Delvoura"}</strong></>
          )}
        </div>

        <div className="delvoura-product-price-row">
          <span className="delvoura-product-price">Rs. {price}</span>
          {mrp && mrp !== price && (
            <span className="delvoura-product-price-old">M.R.P. {mrp}</span>
          )}
        </div>
        <div className="delvoura-product-tax">Inclusive of all taxes</div>
      </div>

      <div className="delvoura-info-divider" />

      <div className="delvoura-info-block">
        <div className="delvoura-product-sizes">
          {variants.map((variant) => {
            const label = typeof variant === "object" ? variant.size : variant;
            return (
              <button key={label} type="button" className={`delvoura-size-btn ${selectedVariant === label ? "is-active" : ""}`} onClick={() => setSelectedVariant(label || "")}>
                {label}
              </button>
            );
          })}
        </div>

        <div className="delvoura-product-actions">
          <div className="delvoura-qty-control">
            <button type="button" className="delvoura-qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
            <span className="delvoura-qty-value">{quantity}</span>
            <button type="button" className="delvoura-qty-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
          <button type="button" className="delvoura-add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
