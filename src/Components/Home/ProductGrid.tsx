import { useMemo, useRef, useState } from "react";
import { Button, Modal, Rate, Spin, Tag, Typography } from "antd";
import { ArrowRightOutlined, CloseOutlined, DownOutlined, LeftOutlined, LoadingOutlined, MinusOutlined, PlusOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { ProductItem } from "../../Types";
import { useAddToCart } from "../../Utils/Hooks";

const { Title, Text } = Typography;

type ProductGridProps = {
  products: ProductItem[];
  isLoading: boolean;
};

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const isModalOpen = Boolean(selectedProduct);
  const modalImages = useMemo(() => {
    if (!selectedProduct) return [];
    const cover = selectedProduct.coverimage || "";
    const imgs = selectedProduct.images?.length ? selectedProduct.images : [];
    const merged = cover ? [cover, ...imgs] : imgs;
    return merged.length ? Array.from(new Set(merged)) : [];
  }, [selectedProduct]);
  
  const activeImage = modalImages[activeImageIndex] || "";
  const handlePrevImage = () => setActiveImageIndex((prev) => (prev <= 0 ? Math.max(0, modalImages.length - 1) : prev - 1));
  const handleNextImage = () => setActiveImageIndex((prev) => (prev >= modalImages.length - 1 ? 0 : prev + 1));
  const scrollThumbs = (direction: "prev" | "next") => {
    const node = thumbsRef.current;
    if (!node) return;
    const delta = direction === "next" ? 140 : -140;
    node.scrollBy({ top: delta, behavior: "smooth" });
  };
  const addToCart = useAddToCart();

  //============== Handle Add To Cart (Select Options Modal) ==============
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart({
      product: selectedProduct,
      selectedVariant,
      quantity,
      image: activeImage || selectedProduct.coverimage || selectedProduct.images?.[0] || "",
    });
  };

  return (
    <section className="delvoura-home-products">
      <div className="delvoura-container">
        <div className="delvoura-product-grid grid gap-6">
          {isLoading || products.length === 0 ? (
            <div className="delvoura-product-empty-state">
              {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: "var(--color-text-muted)" }} spin />} /> : (
                <div className="text-center text-sm text-[color:var(--color-text-muted)]">
                  <img src="/assets/images/order/empty.png" alt="No products" className="mx-auto mb-3 w-40 opacity-80" />
                  <div>No products found</div>
                </div>
              )}
            </div>
          ) : (
            products.map((product, idx) => (
            <article key={product._id || `${product.name}-${idx}`} className="delvoura-product-card cursor-pointer" onClick={() => navigate(ROUTES.getProductDetails(product._id || ""))}>
              <div className="delvoura-product-media">
                <img src={product.coverimage || product.images?.[0] || ""} alt={product.name || "Product"} loading="lazy" />
                <div className="delvoura-product-media-shadow" />
                <div className="delvoura-product-media-shadow-bottom" />
                <div className="delvoura-product-badges">
                  {product.gender ? <Tag key={product.gender} className="delvoura-product-badge">{product.gender}</Tag> : null}
                </div>
                <Button className="delvoura-product-cta delvoura-product-cta-overlay" type="default" onClick={(event) => { event.stopPropagation(); const firstVariant = (product.variants?.[0] as any)?.size || (product.variants?.[0] as any) || "50 ml"; setSelectedProduct(product); setSelectedVariant(firstVariant); setQuantity(1); setActiveImageIndex(0); }}>
                  Select Options
                </Button>
              </div>

              <div className="delvoura-product-content ">
                <h3 className="delvoura-product-title">{product.name || "Untitled"}</h3>
                <div className="delvoura-product-subtitle">{product.title || "Eau De Parfum"}</div>

                <div className="delvoura-product-row">
                  <div className="flex items-center gap-2">
                    <Rate disabled value={Number(product.ratingSummary?.avgRating || 0)} />
                    <span className="delvoura-product-reviews">({product.ratingSummary?.ratingCount || 0})</span>
                  </div>
                  <div className="delvoura-product-sizes">
                  {(product.variants?.length ? product.variants : ["50 ml"]).map((variant: any) => {
                    const label = typeof variant === "string" ? variant : variant?.size;
                    return <span key={label} className="delvoura-size-pill">{label}</span>;
                  })}
                </div>
              </div>

                <div className="delvoura-product-row">
                  <span className="delvoura-product-price">
                    {(() => {
                      const firstVariant = (product.variants?.[0] as any);
                      const price = typeof firstVariant === "object" ? firstVariant?.price ?? 0 : product.price ?? product.mrp ?? 0;
                      return `Rs. ${price}`;
                    })()}
                  </span>
                </div>

                <div className="delvoura-product-tags">
                  {(product.ingredients || []).map((tag, tagIndex) => (
                    <span key={`${tag}-${tagIndex}`}>{tag}{tagIndex < (product.ingredients?.length || 0) - 1 ? " |" : ""}</span>
                  ))}
                </div>

                <Button className="delvoura-product-cta delvoura-product-cta-inline" type="default" onClick={(event) => { event.stopPropagation(); const firstVariant = (product.variants?.[0] as any)?.size || (product.variants?.[0] as any) || "50 ml"; setSelectedProduct(product); setSelectedVariant(firstVariant); setQuantity(1); setActiveImageIndex(0); }}>
                  Select Options
                </Button>
              </div>
            </article>
          ))) }
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={() => setSelectedProduct(null)} footer={null} centered closable={false} width={1080} className="delvoura-select-options-modal" maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)" }} bodyStyle={{ padding: 0 }}>
        {selectedProduct && (
          <div className="delvoura-select-options-card ">
            <button type="button" className="delvoura-select-options-close" onClick={() => setSelectedProduct(null)} aria-label="Close"><CloseOutlined /></button>

              <div className="delvoura-select-options-media">
                <div className="delvoura-select-options-thumbs-wrap">
                <button type="button" className="delvoura-thumb-nav" aria-label="Scroll up" onClick={() => scrollThumbs("prev")}><UpOutlined /></button>
                <div ref={thumbsRef} className="delvoura-select-options-thumbs">
                  {modalImages.map((img, idx) => (
                    <button type="button" className={`delvoura-select-options-thumb ${idx === activeImageIndex ? "is-active" : ""}`} key={`${img}-${idx}`} aria-label={`Preview ${idx + 1}`} onClick={() => setActiveImageIndex(idx)}><img src={img} alt={`${selectedProduct.name} preview ${idx + 1}`} /></button>
                  ))}
                </div>
                <button type="button" className="delvoura-thumb-nav" aria-label="Scroll down" onClick={() => scrollThumbs("next")}><DownOutlined /></button>
              </div>
              <div className="delvoura-select-options-hero delvoura-product-main overflow-hidden">
                <button type="button" className="delvoura-gallery-nav delvoura-gallery-nav-left" aria-label="Previous image" onClick={handlePrevImage}><LeftOutlined /></button>
                <img src={activeImage || selectedProduct.coverimage || selectedProduct.images?.[0] || ""} alt={selectedProduct.name || "Product"} />
                <button type="button" className="delvoura-gallery-nav delvoura-gallery-nav-right" aria-label="Next image" onClick={handleNextImage}><RightOutlined /></button>
              </div>
            </div>

            <div className="delvoura-select-options-info">
              <Title level={3} className="!mb-1 !mt-0">{selectedProduct.name} | Eau De Parfum</Title>
              <div className="delvoura-select-options-rating">
                <Rate disabled value={Number(selectedProduct.ratingSummary?.avgRating || 0)} />
                <span>({selectedProduct.ratingSummary?.ratingCount || 0})</span>
              </div>
              <div className="delvoura-select-options-price-row">
                {(() => {
                  const variants = selectedProduct.variants as any[] | undefined;
                  const selected = variants?.find((v) => (typeof v === "object" ? v.size : v) === selectedVariant);
                  const price = typeof selected === "object" ? selected?.price ?? 0 : selectedProduct.price ?? 0;
                  const mrp = typeof selected === "object" ? selected?.mrp ?? selectedProduct.mrp : selectedProduct.mrp;
                  return (
                    <>
                      <span className="delvoura-select-options-price">Rs. {price}</span>
                      {mrp && mrp !== price && (
                        <span className="delvoura-select-options-price-old">Rs. {mrp}</span>
                      )}
                    </>
                  );
                })()}
              </div>
              <Text className="delvoura-select-options-tax">Inclusive of all taxes</Text>

              <div className="delvoura-select-options-sizes">
                {(selectedProduct.variants?.length ? selectedProduct.variants : ["50 ml"]).map((variant: any) => {
                  const label = typeof variant === "string" ? variant : variant?.size;
                  return <button key={label} type="button" className={`delvoura-select-options-size ${selectedVariant === label ? "is-active" : ""}`} onClick={() => setSelectedVariant(label)}>{label}</button>;
                })}
              </div>

              <div className="delvoura-product-actions">
                <div className="delvoura-qty-control">
                  <button type="button" className="delvoura-qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}><MinusOutlined /></button>
                  <span className="delvoura-qty-value">{quantity}</span>
                  <button type="button" className="delvoura-qty-btn" onClick={() => setQuantity((q) => q + 1)}><PlusOutlined /></button>
                </div>
                <button type="button" className="delvoura-add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
              </div>

              <button type="button" className="delvoura-select-options-link" onClick={() => { setSelectedProduct(null); navigate(ROUTES.getProductDetails(selectedProduct._id || "")); }}>View full details <ArrowRightOutlined /></button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default ProductGrid;
