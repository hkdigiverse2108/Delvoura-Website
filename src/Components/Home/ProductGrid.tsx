import { useMemo, useState } from "react";
import { Button, Modal, Rate, Tag, Typography } from "antd";
import { ArrowRightOutlined, CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const products = [
  {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Citrus Drift",
    subtitle: "Inspired by Aqua di Gio",
    price: "Rs. 299 - 799.0",
    rating: 4,
    reviews: 23,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aromatic", "Aquatic", "Spicy", "Amber"],
    badges: ["Men"],
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Amber Veil",
    subtitle: "Inspired by Invite Only Amber",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 14,
    sizes: ["50 ml", "100 ml"],
    tags: ["Woody", "Amber", "Spicy", "Earthy"],
    badges: ["Unisex", "Women"],
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Citrus Drift",
    subtitle: "Inspired by Aqua di Gio",
    price: "Rs. 299 - 799.0",
    rating: 4,
    reviews: 23,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aromatic", "Aquatic", "Spicy", "Amber"],
    badges: ["Men"],
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Amber Veil",
    subtitle: "Inspired by Invite Only Amber",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 14,
    sizes: ["50 ml", "100 ml"],
    tags: ["Woody", "Amber", "Spicy", "Earthy"],
    badges: ["Unisex", "Women"],
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Aqua Prism",
    subtitle: "Inspired by Cool Water",
    price: "Rs. 299 - 799.0",
    rating: 5,
    reviews: 100,
    sizes: ["50 ml", "100 ml"],
    tags: ["Aquatic", "Green", "Aromatic", "Spicy"],
    badges: ["Unisex"],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop",
  },
];

const ProductGrid = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("50 ml");
  const isModalOpen = Boolean(selectedProduct);
  const modalImages = useMemo(() => {
    if (!selectedProduct) return [];
    return Array.from({ length: 4 }, () => selectedProduct.image);
  }, [selectedProduct]);

  return (
    <section className="delvoura-home-products">
      <div className="mx-auto w-[90%] max-w-[1700px]">
        <div className="delvoura-product-grid grid gap-6">
          {products.map((product, idx) => (
            <article key={`${product.name}-${idx}`} className="delvoura-product-card cursor-pointer" onClick={() => navigate(`/products/${idx + 1}`)}>
              <div className="delvoura-product-media">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="delvoura-product-media-shadow" />
                <div className="delvoura-product-media-shadow-bottom" />
                <div className="delvoura-product-badges">
                  {product.badges.map((badge) => (
                    <Tag key={badge} className="delvoura-product-badge">
                      {badge}
                    </Tag>
                  ))}
                </div>
                <Button className="delvoura-product-cta delvoura-product-cta-overlay" type="default" onClick={(event) => { event.stopPropagation(); setSelectedProduct(product); setSelectedSize(product.sizes[0]);}}>
                  Select Options
                </Button>
              </div>

              <div className="delvoura-product-content ">
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
          ))}
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={() => setSelectedProduct(null)} footer={null} centered closable={false} width={1080} className="delvoura-select-options-modal" maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)" }} bodyStyle={{ padding: 0 }}>
        {selectedProduct && (
          <div className="delvoura-select-options-card ">
            <button type="button" className="delvoura-select-options-close" onClick={() => setSelectedProduct(null)} aria-label="Close" >
              <CloseOutlined />
            </button>

            <div className="delvoura-select-options-media">
              <div className="delvoura-select-options-thumbs">
                {modalImages.map((img, idx) => (
                  <button type="button" className="delvoura-select-options-thumb" key={`${img}-${idx}`} aria-label={`Preview ${idx + 1}`} >
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
                  <button key={size} type="button" className={`delvoura-select-options-size ${selectedSize === size ? "is-active" : ""}`} onClick={() => setSelectedSize(size)} >
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

              <button type="button" className="delvoura-select-options-link" onClick={() => { setSelectedProduct(null); navigate(`/products/1`);}}>
                View full details <ArrowRightOutlined />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ProductGrid;
