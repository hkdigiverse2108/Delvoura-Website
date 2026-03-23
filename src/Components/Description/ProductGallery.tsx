import { useEffect, useMemo, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { ProductItem } from "../../Types";

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

  useEffect(() => {
    setActiveIndex(0);
  }, [product]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
          <button type="button" key={`${img}-${idx}`} className={`delvoura-product-thumb ${idx === activeIndex ? "is-active" : ""}`} onClick={() => setActiveIndex(idx)} aria-label={`View image ${idx + 1}`} >
            <img src={img} alt={`${product?.name || "Product"} thumbnail ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="delvoura-product-main">
        <button type="button" className="delvoura-gallery-nav delvoura-gallery-nav-left" aria-label="Previous image" onClick={handlePrev} >
          <LeftOutlined />
        </button>
        <img src={activeImage} alt={product?.name || "Product"} />
        <button  type="button"  className="delvoura-gallery-nav delvoura-gallery-nav-right"  aria-label="Next image"  onClick={handleNext}>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
