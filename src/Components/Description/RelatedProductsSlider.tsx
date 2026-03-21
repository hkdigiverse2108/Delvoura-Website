import { useMemo, useRef, useState } from "react";
import { Button, Modal, Rate, Tag, Typography } from "antd";
import { ArrowRightOutlined, CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const products = [
  {
    name: "Ocean Breeze",
    subtitle: "Inspired by Davidoff Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 59,
    sizes: ["50 ml", "15 ml"],
    tags: ["Fruity", "Citrus", "Aquatic", "Fresh"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Pause",
    subtitle: "Inspired by Bleu de Chanel",
    price: "Rs. 299 - 799.0",
    rating: 4,
    reviews: 25,
    sizes: ["50 ml", "15 ml"],
    tags: ["Aromatic", "Spicy", "Fruity", "Woody"],
    badges: ["Women", "Unisex"],
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Ispahan",
    subtitle: "Solid Perfume",
    price: "Rs. 249",
    rating: 5,
    reviews: 13,
    sizes: ["12 g"],
    tags: ["Oud", "Floral", "Woody", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Ispahan",
    subtitle: "Eau De Parfum",
    price: "Rs. 299 - 799.0",
    rating: 4,
    reviews: 30,
    sizes: ["50 ml", "15 ml"],
    tags: ["Oud", "Floral", "Woody", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Million",
    subtitle: "Eau De Parfum",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 34,
    sizes: ["50 ml", "15 ml"],
    tags: ["Floral", "Amber", "Animalic", "Woody"],
    badges: ["Men", "Unisex"],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop",
  },
];

const RelatedProductsSlider = () => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("50 ml");
  const isModalOpen = Boolean(selectedProduct);
  const modalImages = useMemo(() => {
    if (!selectedProduct) return [];
    return Array.from({ length: 4 }, () => selectedProduct.image);
  }, [selectedProduct]);

  const scrollByCard = (direction: "prev" | "next") => {
    const track = trackRef.current;
    const card = cardRef.current;
    if (!track || !card) return;
    const gap = 16;
    const cardWidth = card.getBoundingClientRect().width + gap;
    const delta = direction === "next" ? cardWidth : -cardWidth;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="delvoura-home-products delvoura-related-products">
      <div className="delvoura-related-inner">
        <div className="delvoura-related-header">
          <h2 className="delvoura-related-title">Fragrances You Might Love</h2>
        </div>

        <div className="delvoura-related-carousel">
          <div ref={trackRef} className="delvoura-related-track">
            {products.map((product, idx) => (
              <div
                key={`${product.name}-${idx}`}
                className="delvoura-related-slide"
                ref={idx === 0 ? cardRef : null}
              >
                <article className="delvoura-product-card cursor-pointer" onClick={() => navigate(`/products/${idx + 1}`)}>
                  <div className="delvoura-product-media">
                    <img src={product.image} alt={product.name} loading="lazy"  onClick={() => navigate(`/products/${idx + 1}`)}/>
                    <div className="delvoura-product-media-shadow" />
                    <div className="delvoura-product-media-shadow-bottom" />
                    <div className="delvoura-product-badges">
                      {product.badges.map((badge) => (
                        <Tag key={badge} className="delvoura-product-badge">
                          {badge}
                        </Tag>
                      ))}
                    </div>
                    <Button
                      className="delvoura-product-cta delvoura-product-cta-overlay"
                      type="default"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedProduct(product);
                        setSelectedSize(product.sizes[0]);
                      }}
                    >
                      Select Options
                    </Button>
                  </div>

                  <div className="delvoura-product-content">
                    <h3 className="delvoura-product-title">{product.name}</h3>
                    <div className="delvoura-product-subtitle">{product.subtitle}</div>

                    <div className="delvoura-product-row">
                      <div className="flex items-center gap-2">
                        <Rate disabled defaultValue={product.rating} />
                        <span className="delvoura-product-reviews">({product.reviews})</span>
                      </div>
                      <div className="delvoura-product-sizes">
                        {product.sizes.map((size) => (
                          <span key={size} className="delvoura-size-pill">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="delvoura-product-row">
                      <span className="delvoura-product-price">{product.price}</span>
                    </div>

                    <div className="delvoura-product-tags">
                      {product.tags.map((tag, tagIndex) => (
                        <span key={`${tag}-${tagIndex}`}>
                          {tag}
                          {tagIndex < product.tags.length - 1 ? " |" : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Previous fragrance"
            onClick={() => scrollByCard("prev")}
            className="delvoura-related-nav delvoura-related-nav-left"
          >
            <LeftOutlined />
          </button>
          <button
            type="button"
            aria-label="Next fragrance"
            onClick={() => scrollByCard("next")}
            className="delvoura-related-nav delvoura-related-nav-right"
          >
            <RightOutlined />
          </button>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
        centered
        closable={false}
        width={1080}
        className="delvoura-select-options-modal"
        maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)" }}
        bodyStyle={{ padding: 0 }}
      >
        {selectedProduct && (
          <div className="delvoura-select-options-card">
            <button
              type="button"
              className="delvoura-select-options-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              <CloseOutlined />
            </button>

            <div className="delvoura-select-options-media">
              <div className="delvoura-select-options-thumbs">
                {modalImages.map((img, idx) => (
                  <button
                    type="button"
                    className="delvoura-select-options-thumb"
                    key={`${img}-${idx}`}
                    aria-label={`Preview ${idx + 1}`}
                  >
                    <img src={img} alt={`${selectedProduct.name} preview ${idx + 1}`} />
                  </button>
                ))}
              </div>
              <div className="delvoura-select-options-hero overflow-hidden">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
            </div>

            <div className="delvoura-select-options-info">
              <Title level={3} className="!mb-1 !mt-0">
                {selectedProduct.name} | Eau De Parfum
              </Title>
              <div className="delvoura-select-options-rating">
                <Rate disabled defaultValue={selectedProduct.rating} />
                <span>({selectedProduct.reviews})</span>
              </div>
              <div className="delvoura-select-options-price-row">
                <span className="delvoura-select-options-price">Rs. 799</span>
                <span className="delvoura-select-options-price-old">Rs. 1,499</span>
              </div>
              <Text className="delvoura-select-options-tax">Inclusive of all taxes</Text>

              <div className="delvoura-select-options-sizes">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`delvoura-select-options-size ${selectedSize === size ? "is-active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="delvoura-select-options-actions">
                <Button className="delvoura-qty-btn">-</Button>
                <span className="delvoura-qty-value">1</span>
                <Button className="delvoura-qty-btn">+</Button>
                <Button className="delvoura-add-to-cart" type="primary">
                  Add To Cart
                </Button>
              </div>

              <button
                type="button"
                className="delvoura-select-options-link"
                onClick={() => {
                  setSelectedProduct(null);
                  navigate(`/products/1`);
                }}
              >
                View full details <ArrowRightOutlined/>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default RelatedProductsSlider;
