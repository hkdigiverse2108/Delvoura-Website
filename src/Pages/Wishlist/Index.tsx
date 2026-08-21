import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { HeartFilled, ShoppingCartOutlined, DeleteOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { OfferBar, EmptyState } from "../../Components/common";
import { ROUTES } from "../../Constants";
import { useAddToCart, useWishlist } from "../../Utils/Hooks";

const WishlistPage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const addToCart = useAddToCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) return setHideOfferBar(true);
      return setHideOfferBar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
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
    <>
      <section className="relative w-full min-h-screen bg-[color:var(--color-bg)]">
        <div className="sticky top-0 z-[550] w-full">
          <Header />
        </div>
        {!hideOfferBar && <OfferBar className="top-20" />}

        <div className="delvoura-container py-8 md:py-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-bg)] text-[var(--color-accent)] flex items-center justify-center text-lg">
                <HeartFilled />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-medium tracking-wide m-0">My Wishlist</h1>
                <p className="text-sm text-[var(--color-text-muted)] m-0">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>

            {wishlistItems.length > 0 && (
              <Button
                type="default"
                onClick={() => navigate(ROUTES.COLLECTIONS_ALL)}
                className="hidden sm:inline-flex items-center gap-2"
              >
                Continue Shopping <ArrowRightOutlined />
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <div className="py-16 text-center">
              <EmptyState message="Your wishlist is empty" imageAlt="Empty Wishlist" />
              <p className="text-sm text-[var(--color-text-muted)] mt-2 mb-6">
                Explore our luxury perfumes and save your favourites here.
              </p>
              <Button
                type="primary"
                size="large"
                style={{ backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                onClick={() => navigate(ROUTES.COLLECTIONS_ALL)}
              >
                Explore Collections
              </Button>
            </div>
          ) : (
            <div className="delvoura-product-grid grid gap-6">
              {wishlistItems.map((product, idx) => {
                const productId = product._id || (product as any).id || "";
                const firstVariant = product.variants?.[0] as any;
                const rawPrice =
                  typeof firstVariant === "object"
                    ? firstVariant?.price ?? firstVariant?.mrp ?? product.price ?? product.mrp ?? 0
                    : product.price ?? product.mrp ?? 0;
                const rawMrp =
                  typeof firstVariant === "object"
                    ? firstVariant?.mrp ?? product.mrp ?? 0
                    : product.mrp ?? 0;
                const price = Number(rawPrice) || 0;
                const mrp = Number(rawMrp) || 0;
                const saving = mrp > price ? mrp - price : 0;
                const discountPercent = mrp > price && mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0;

                return (
                  <article
                    key={productId || `${product.name}-${idx}`}
                    className="delvoura-product-card cursor-pointer group relative"
                    onClick={() => {
                      if (!productId) return;
                      navigate(ROUTES.getProductDetails(productId));
                    }}
                  >
                    <div className="delvoura-product-media relative overflow-hidden">
                      <img
                        src={product.coverimage || product.images?.[0] || ""}
                        alt={product.name || "Product"}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />

                      {/* Top Right Badges & Remove Button */}
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
                          className="w-8 h-8 rounded-full bg-white/90 shadow hover:bg-white text-red-500 flex items-center justify-center transition-transform hover:scale-110"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWishlist(productId);
                          }}
                          title="Remove from wishlist"
                          aria-label="Remove from wishlist"
                        >
                          <DeleteOutlined style={{ fontSize: 14 }} />
                        </button>
                      </div>

                      {/* Gender and Discount tags */}
                      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5 items-start">
                        {product.gender && (
                          <span className="bg-white/95 backdrop-blur-sm text-[#111111] text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm border border-black/10 tracking-wider">
                            {product.gender}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="bg-[#2e7d32] text-white text-[11px] font-bold uppercase px-2.5 py-0.5 rounded shadow-sm">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="delvoura-product-content p-4">
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mb-1">
                        <span>★</span>
                        <span>{Number(product.ratingSummary?.avgRating || 4.7).toFixed(1)}</span>
                        <span className="text-[var(--color-text-muted)] font-normal">
                          ({product.ratingSummary?.ratingCount || 0})
                        </span>
                      </div>

                      <h3 className="delvoura-product-title text-base font-medium line-clamp-1 mb-0.5">
                        {product.name || "Untitled"}
                      </h3>
                      <div className="delvoura-product-subtitle text-xs text-[var(--color-text-muted)] mb-2">
                        {product.title || "Eau De Parfum"}
                      </div>

                      {saving > 0 && (
                        <div className="text-xs font-medium text-[#2e7d32] mb-1">
                          (Saving ₹{saving.toFixed(2)})
                        </div>
                      )}

                      <div className="delvoura-product-price-row flex items-baseline gap-2 mb-3">
                        <span className="text-base font-semibold text-[var(--color-text)]">
                          ₹{price.toFixed(2)}
                        </span>
                        {Boolean(mrp && mrp > price) && (
                          <span className="text-xs text-[var(--color-text-muted)] line-through">
                            ₹{mrp.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        type="primary"
                        className="w-full !bg-[#111111] !text-white hover:!opacity-90 flex items-center justify-center gap-2 !h-10 font-medium"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCartOutlined /> Add To Cart
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default WishlistPage;
