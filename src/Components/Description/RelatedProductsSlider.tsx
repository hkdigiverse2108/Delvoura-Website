import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, Rate, Spin, Tag, Typography } from "antd";
import { ArrowRightOutlined, CloseOutlined, DownOutlined, LeftOutlined, LoadingOutlined, MinusOutlined, PlusOutlined, RightOutlined, UpOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { ProductItem } from "../../Types";
import { useFeaturedProducts, useAddToCart } from "../../Utils/Hooks";
import { EmptyState } from "../common";

const { Title, Text } = Typography;

type RelatedProductsSliderProps = { excludeId?: string };

const RelatedProductsSlider = ({ excludeId }: RelatedProductsSliderProps) => {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [activePage, setActivePage] = useState(0);
  
  const { products, isLoading: isLoadingProducts } = useFeaturedProducts(excludeId);
  
  const modalImages = useMemo(() => {
    if (!selectedProduct) return [];
    const cover = selectedProduct.coverimage || "";
    const imgs = selectedProduct.images?.length ? selectedProduct.images : [];
    return [...new Set(cover ? [cover, ...imgs] : imgs)];
  }, [selectedProduct]);
  
  const activeImage = modalImages[activeImageIndex] || "";
  
  const handlePrevImage = () => setActiveImageIndex(prev => prev <= 0 ? modalImages.length - 1 : prev - 1);
  const handleNextImage = () => setActiveImageIndex(prev => prev >= modalImages.length - 1 ? 0 : prev + 1);
  
  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "prev" | "next", amount: number) => {
    if (!ref.current) return;
    const delta = direction === "next" ? amount : -amount;
    ref.current.scrollBy({ left: ref === trackRef ? delta : 0, top: ref === thumbsRef ? delta : 0, behavior: "smooth" });
  };
  
  const scrollByCard = (direction: "prev" | "next") => {
    if (!trackRef.current || !cardRef.current) return;
    const cardWidth = cardRef.current.getBoundingClientRect().width + 16;
    scroll(trackRef, direction, cardWidth * slidesPerView);
  };
  
  const scrollThumbs = (direction: "prev" | "next") => scroll(thumbsRef, direction, 140);
  
  const goToPage = (page: number) => {
    if (!trackRef.current || !cardRef.current) return;
    const cardWidth = cardRef.current.getBoundingClientRect().width + 16;
    trackRef.current.scrollTo({ left: page * cardWidth * slidesPerView, behavior: "smooth" });
  };
  
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width <= 640) setSlidesPerView(1);
      else if (width <= 900) setSlidesPerView(2);
      else if (width <= 1200) setSlidesPerView(3);
      else setSlidesPerView(4);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);
  
  useEffect(() => {
    const track = trackRef.current;
    const card = cardRef.current;
    if (!track || !card) return;
    const cardWidth = card.getBoundingClientRect().width + 16;
    const onScroll = () => setActivePage(Math.round(track.scrollLeft / (cardWidth * slidesPerView)) || 0);
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slidesPerView]);
  
  const totalPages = Math.ceil(products.length / slidesPerView);
  
  const getPrice = (product: ProductItem, variant?: string) => {
    const variants = product.variants as any[];
    const selected = variants?.find(v => (typeof v === "object" ? v.size : v) === variant);
    if (selected && typeof selected === "object") return selected.price ?? 0;
    return product.price ?? product.mrp ?? 0;
  };
  const addToCart = useAddToCart();
  
  //============== Handle Add To Cart (Related Products Modal) ==============
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart({
      product: selectedProduct,
      selectedVariant,
      quantity,
      image: activeImage || selectedProduct.coverimage || selectedProduct.images?.[0] || "",
    });
  };
  
  const ProductCard = ({ product }: { product: ProductItem }) => (
    <article className="delvoura-product-card cursor-pointer" onClick={() => navigate(ROUTES.getProductDetails(product._id || ""))}>
      <div className="delvoura-product-media">
        <img src={product.coverimage || product.images?.[0] || ""} alt={product.name || "Product"} loading="lazy" />
        <div className="delvoura-product-media-shadow" />
        <div className="delvoura-product-media-shadow-bottom" />
        {product.gender && <div className="delvoura-product-badges"><Tag className="delvoura-product-badge">{product.gender}</Tag></div>}
        {/* Keep modal open on button click without navigating the card */}
        <Button className="delvoura-product-cta delvoura-product-cta-overlay" type="default" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setSelectedVariant((product.variants?.[0] as any)?.size || "50 ml"); setQuantity(1); setActiveImageIndex(0); }}>Select Options</Button>
      </div>
      <div className="delvoura-product-content">
        <h3 className="delvoura-product-title">{product.name || "Untitled"}</h3>
        <div className="delvoura-product-subtitle">{product.title || "Eau De Parfum"}</div>
        <div className="delvoura-product-row">
          <div className="flex items-center gap-2"><Rate disabled value={Number(product.ratingSummary?.avgRating || 0)} /><span className="delvoura-product-reviews">({product.ratingSummary?.ratingCount || 0})</span></div>
          <div className="delvoura-product-sizes">{(product.variants?.length ? product.variants : ["50 ml"]).map((v: any) => <span key={typeof v === "string" ? v : v?.size} className="delvoura-size-pill">{typeof v === "string" ? v : v?.size}</span>)}</div>
        </div>
        <div className="delvoura-product-row"><span className="delvoura-product-price">Rs. {getPrice(product)}</span></div>
        <div className="delvoura-product-tags">{(product.ingredients || []).map((tag, i) => <span key={i}>{tag}{i < (product.ingredients?.length || 0) - 1 ? " |" : ""}</span>)}</div>
      </div>
    </article>
  );
  
  return (
    <section className="delvoura-home-products delvoura-related-products">
      <div className="delvoura-related-inner">
        <div className="delvoura-related-header"><h2 className="delvoura-related-title">Fragrances You Might Love</h2></div>
        
        <div className="delvoura-related-carousel">
          {isLoadingProducts || products.length === 0 ? (
            isLoadingProducts ? (
              <div className="delvoura-product-empty-state">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 32, color: "var(--color-text-muted)" }} spin />} />
              </div>
            ) : (
              <EmptyState message="No featured products found" imageAlt="No featured products" />
            )
          ) : (
            <>
              <div ref={trackRef} className="delvoura-related-track">{products.map((product, idx) => <div key={product._id || `${product.name}-${idx}`} className="delvoura-related-slide" ref={idx === 0 ? cardRef : null}><ProductCard product={product} /></div>)}</div>
              <button type="button" aria-label="Previous fragrance" onClick={() => scrollByCard("prev")} className="delvoura-related-nav delvoura-related-nav-left"><LeftOutlined /></button>
              <button type="button" aria-label="Next fragrance" onClick={() => scrollByCard("next")} className="delvoura-related-nav delvoura-related-nav-right"><RightOutlined /></button>
            </>
          )}
        </div>
        
        {totalPages > 0 && (
          <div className="delvoura-related-dots" role="tablist">
            {Array.from({ length: totalPages }).map((_, idx) => <button key={`dot-${idx}`} type="button" role="tab" aria-selected={activePage === idx} className={`delvoura-related-dot ${activePage === idx ? "is-active" : ""}`} onClick={() => goToPage(idx)} />)}
          </div>
        )}
      </div>
      
      <Modal open={!!selectedProduct} onCancel={() => setSelectedProduct(null)} footer={null} centered width={1080} closable={false} className="delvoura-select-options-modal" maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-text) 35%, transparent)" }} bodyStyle={{ padding: 0 }}>
        {selectedProduct && (
          <div className="delvoura-select-options-card">
            <button type="button" className="delvoura-select-options-close" onClick={() => setSelectedProduct(null)}><CloseOutlined /></button>
            <div className="delvoura-select-options-media">
              <div className="delvoura-select-options-thumbs-wrap">
                <button type="button" className="delvoura-thumb-nav" onClick={() => scrollThumbs("prev")}><UpOutlined /></button>
                <div ref={thumbsRef} className="delvoura-select-options-thumbs">{modalImages.map((img, idx) => <button key={idx} type="button" className={`delvoura-select-options-thumb ${idx === activeImageIndex ? "is-active" : ""}`} onClick={() => setActiveImageIndex(idx)}><img src={img} alt={`Preview ${idx + 1}`} /></button>)}</div>
                <button type="button" className="delvoura-thumb-nav" onClick={() => scrollThumbs("next")}><DownOutlined /></button>
              </div>
              <div className="delvoura-select-options-hero delvoura-product-main overflow-hidden">
                <button type="button" className="delvoura-gallery-nav delvoura-gallery-nav-left" onClick={handlePrevImage}><LeftOutlined /></button>
                <img src={activeImage || selectedProduct.coverimage || selectedProduct.images?.[0] || ""} alt={selectedProduct.name || "Product"} />
                <button type="button" className="delvoura-gallery-nav delvoura-gallery-nav-right" onClick={handleNextImage}><RightOutlined /></button>
              </div>
            </div>
            <div className="delvoura-select-options-info">
              <Title level={3} className="!mb-1 !mt-0">{selectedProduct.name} | Eau De Parfum</Title>
              <div className="delvoura-select-options-rating"><Rate disabled value={Number(selectedProduct.ratingSummary?.avgRating || 0)} /><span>({selectedProduct.ratingSummary?.ratingCount || 0})</span></div>
              <div className="delvoura-select-options-price-row">
                {(() => {
                  const variants = selectedProduct.variants as any[] | undefined;
                  const selected = variants?.find((v) => (typeof v === "object" ? v.size : v) === selectedVariant);
                  const price = typeof selected === "object" ? selected?.price ?? 0 : selectedProduct.price ?? 0;
                  const mrp = typeof selected === "object" ? selected?.mrp ?? selectedProduct.mrp : selectedProduct.mrp;
                  return (
                    <>
                      <span className="delvoura-select-options-price">Rs. {price}</span>
                      {mrp && mrp !== price && <span className="delvoura-select-options-price-old">Rs. {mrp}</span>}
                    </>
                  );
                })()}
              </div>
              <Text className="delvoura-select-options-tax">Inclusive of all taxes</Text>
              <div className="delvoura-select-options-sizes">{(selectedProduct.variants?.length ? selectedProduct.variants : ["50 ml"]).map((v: any) => {
                const label = typeof v === "string" ? v : v?.size;
                return <button key={label} type="button" className={`delvoura-select-options-size ${selectedVariant === label ? "is-active" : ""}`} onClick={() => setSelectedVariant(label)}>{label}</button>;
              })}</div>
              <div className="delvoura-product-actions">
                <div className="delvoura-qty-control"><button type="button" className="delvoura-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}><MinusOutlined /></button><span className="delvoura-qty-value">{quantity}</span><button type="button" className="delvoura-qty-btn" onClick={() => setQuantity(q => q + 1)}><PlusOutlined /></button></div>
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

export default RelatedProductsSlider;
