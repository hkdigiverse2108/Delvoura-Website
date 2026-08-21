import { Button, Spin } from "antd";
import { HeartFilled, HeartOutlined, LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { ProductItem } from "../../Types";
import { useAddToCart, useWishlist } from "../../Utils/Hooks";
import { EmptyState } from "../common";

type ProductGridProps = {
  products: ProductItem[];
  isLoading: boolean;
};

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleDirectAddToCart = (product: ProductItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const firstVariant = (product.variants?.[0] as any)?.size || (product.variants?.[0] as any) || "50 ml";
    addToCart({
      product,
      selectedVariant: firstVariant,
      quantity: 1,
      image: product.coverimage || product.images?.[0] || "",
    });
  };

  return (
    <section className="delvoura-home-products">
      <div className="delvoura-container">
        <div className="delvoura-product-grid grid gap-6">
          {isLoading || products.length === 0 ? (
            isLoading ? (
              <div className="delvoura-product-empty-state">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: "var(--color-text-muted)" }} spin />} />
              </div>
            ) : (
              <EmptyState message="No products found" imageAlt="No products" />
            )
          ) : (
            products.map((product, idx) => {
              const productId = product._id || (product as any).id || "";
              const inWishlist = isInWishlist(productId);
              
              const firstVariant = (product.variants?.[0] as any);
              const rawPrice = typeof firstVariant === "object" ? firstVariant?.price ?? firstVariant?.mrp ?? product.price ?? product.mrp ?? 0 : product.price ?? product.mrp ?? 0;
              const rawMrp = typeof firstVariant === "object" ? firstVariant?.mrp ?? product.mrp ?? 0 : product.mrp ?? 0;
              const price = Number(rawPrice) || 0;
              const mrp = Number(rawMrp) || 0;
              const saving = mrp > price ? mrp - price : 0;
              const discountPercent = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;
              const rating = Number(product.ratingSummary?.avgRating || 4.7).toFixed(1);
              const reviewCount = product.ratingSummary?.ratingCount || 0;

              return (
                <article
                  key={productId || `${product.name}-${idx}`}
                  className="delvoura-product-card cursor-pointer group flex flex-col justify-between"
                  onClick={() => {
                    if (!productId) return;
                    navigate(ROUTES.getProductDetails(productId));
                  }}
                >
                  <div>
                    {/* MEDIA */}
                    <div className="delvoura-product-media relative overflow-hidden">
                      <img
                        src={product.coverimage || product.images?.[0] || ""}
                        alt={product.name || "Product"}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      {product.gender && (
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="bg-white/95 backdrop-blur-sm text-[#111111] text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm border border-black/10 tracking-wider">
                            {product.gender}
                          </span>
                        </div>
                      )}

                      {/* Top Right Badges & Wishlist Heart Button */}
                      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                        {product.isTrending && (
                          <span
                            className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center text-xs shadow-md"
                            title="Trending Product"
                          >
                            🔥
                          </span>
                        )}
                        {product.isFeatured && (
                          <span
                            className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center text-xs shadow-md"
                            title="Featured Product"
                          >
                            ⭐
                          </span>
                        )}
                        <button
                          type="button"
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                            inWishlist
                              ? "bg-white text-red-500 scale-105"
                              : "bg-white/80 text-gray-700 hover:bg-white hover:text-red-500"
                          }`}
                          onClick={(e) => toggleWishlist(product, e)}
                          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                          aria-label="Wishlist"
                        >
                          {inWishlist ? (
                            <HeartFilled style={{ fontSize: 16 }} />
                          ) : (
                            <HeartOutlined style={{ fontSize: 16 }} />
                          )}
                        </button>
                      </div>

                      {/* Offer Highlight Badge on image (Point 12) */}
                      {discountPercent > 0 && (
                        <div className="absolute bottom-2 left-2 z-10">
                          <span className="bg-[#2e7d32] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow">
                            {discountPercent}% OFF
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="delvoura-product-content p-3.5">
                      {/* Rating (Point 9 & 11) */}
                      <div
                        className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-1 cursor-pointer w-fit"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (productId) navigate(ROUTES.getProductDetails(productId));
                        }}
                      >
                        <span className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700 font-bold text-[11px]">
                          ★ {rating}
                        </span>
                        <span className="text-[var(--color-text-muted)] font-normal text-[11px]">
                          ({reviewCount})
                        </span>
                      </div>

                      {/* Title & Subtitle (Point 11) */}
                      <h3 className="delvoura-product-title text-sm md:text-base font-medium line-clamp-1 mb-0.5 text-[var(--color-text)]">
                        {product.name || "Untitled"}
                      </h3>
                      <div className="delvoura-product-subtitle text-xs text-[var(--color-text-muted)] line-clamp-1 mb-2">
                        {product.title || "Eau De Parfum"}
                      </div>

                      {/* Saving Price (Point 11) */}
                      {saving > 0 ? (
                        <div className="text-xs font-medium text-[#2e7d32] mb-1">
                          (Saving ₹{saving.toFixed(2)})
                        </div>
                      ) : (
                        <div className="text-xs font-medium text-transparent mb-1 select-none">
                          (Saving ₹0.00)
                        </div>
                      )}

                      {/* Price Row (Point 11) */}
                      <div className="delvoura-product-price-row flex items-baseline gap-2 mb-3">
                        <span className="text-base font-bold text-[var(--color-text)]">
                          ₹{price.toFixed(2)}
                        </span>
                        {Boolean(mrp && mrp > price) && (
                          <span className="text-xs text-[var(--color-text-muted)] line-through">
                            ₹{mrp.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add To Cart Button (Point 10 & 11) */}
                  <div className="p-3.5 pt-0">
                    <Button
                      type="primary"
                      className="w-full !bg-[#111111] !text-white hover:!opacity-90 flex items-center justify-center gap-2 !h-10 font-medium !rounded-md"
                      onClick={(e) => handleDirectAddToCart(product, e)}
                    >
                      <ShoppingCartOutlined /> Add To Cart
                    </Button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
