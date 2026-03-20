import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const ProductGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=1200&auto=format&fit=crop",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
            <img src={img} alt={`Promise thumbnail ${idx + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="delvoura-product-main">
        <button
          type="button"
          className="delvoura-gallery-nav delvoura-gallery-nav-left"
          aria-label="Previous image"
          onClick={handlePrev}
        >
          <LeftOutlined />
        </button>
        <img src={activeImage} alt="Promise Eau De Parfum" />
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
