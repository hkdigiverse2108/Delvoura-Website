import { useEffect, useMemo, useState } from "react";
import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { readCart, writeCart, type CartItem } from "../../Utils/Hooks/useCart";
import { useFeaturedProducts, useAddToCart } from "../../Utils/Hooks";
import type { ProductItem } from "../../Types";
import { DeleteOutlined } from "@ant-design/icons";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { products: featuredProducts, isLoading: isFeaturedLoading } = useFeaturedProducts();
  const addToCart = useAddToCart();

  useEffect(() => {
    const load = () => setCartItems(readCart());
    load();
    const onUpdate = () => load();
    window.addEventListener("delvoura-cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("delvoura-cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const canCheckout = cartItems.length > 0;

  const updateQty = (id: string, size: string, delta: number) => {
    const next = cartItems
      .map((item) => (item.id === id && item.size === size ? { ...item, qty: item.qty + delta } : item))
      .filter((item) => item.qty > 0);
    setCartItems(next);
    writeCart(next);
  };

  const removeItem = (id: string, size: string) => {
    const next = cartItems.filter((item) => !(item.id === id && item.size === size));
    setCartItems(next);
    writeCart(next);
  };

  const getFirstVariantLabel = (product: ProductItem) => {
    const v = product.variants?.[0] as any;
    return typeof v === "object" ? v?.size || "50 ml" : v || "50 ml";
  };

  const getVariantPrice = (product: ProductItem, variantLabel?: string) => {
    const variants = product.variants as any[] | undefined;
    const selected = variants?.find((v) => (typeof v === "object" ? v.size : v) === variantLabel);
    if (selected && typeof selected === "object") return Number(selected?.price ?? selected?.mrp ?? 0);
    return Number(product.price ?? product.mrp ?? 0);
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="delvoura-glow-pill delvoura-cart-btn relative grid h-11 w-11 place-items-center rounded-2xl transition" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="delvoura-cart-drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18a2 2 0 11.001 3.999A2 2 0 017 18zm10 0a2 2 0 11.001 3.999A2 2 0 0117 18zM7.2 6h13.6l-1.5 8.2a2 2 0 01-2 1.6H9.4a2 2 0 01-2-1.6L5 3H2V1h4l1.2 5z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-bold text-[color:var(--color-text-on-dark)]">
            {cartCount}
          </span>
        )}
      </button>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" width={420} mask closable={false} bodyStyle={{ padding: 0, background: "transparent" }} maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 35%, transparent)", backdropFilter: "blur(6px)" }} contentWrapperStyle={{ borderRadius: "22px 0 0 22px", overflow: "hidden", height: "100vh" }} rootClassName="delvoura-cart-drawer delvoura-light-surface">
        <div className="delvoura-cart-shell h-full p-2.5">
          <div id="delvoura-cart-drawer" className="flex h-full flex-col overflow-hidden rounded-2xl bg-[color:var(--color-surface-dark)] text-[color:var(--color-text-on-dark)]" style={{   boxShadow:  "0 18px 50px color-mix(in srgb, var(--color-primary) 20%, transparent)", }}>
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-dark)] px-5 py-4">
              <h3 className="text-base font-semibold tracking-wide">Your Cart ({cartCount})</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-border-dark)] text-lg transition hover:border-[color:var(--color-accent)]" aria-label="Close cart">
                x
              </button>
            </div>

            <div className="delvoura-cart-scroll flex-1 overflow-y-auto px-5 py-4">
              <div className="mt-2 border-b border-[color:var(--color-border-dark)] pb-5">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center text-sm text-[color:var(--color-text-on-dark-muted)]">
                    <img src="/assets/images/order/emptyCart.png" alt="Empty cart" className="mx-auto mb-4 w-40 opacity-80" />
                    <div>Your cart is empty.</div>
                  </div>
                ) : cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.size}`} role="button" tabIndex={0}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(ROUTES.getProductDetails(item.id));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setIsOpen(false);
                        navigate(ROUTES.getProductDetails(item.id));
                      }
                    }}
                    className={`delvoura-cart-item-card flex gap-4 pb-5 ${index < cartItems.length - 1 ? "mb-5 border-b border-[color:var(--color-border-dark)]" : ""}`}
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-darker)]">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-on-dark-muted)]">
                          EDP
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="delvoura-cart-title text-sm font-semibold uppercase tracking-wide"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </h4>
                          <p className="text-xs text-[color:var(--color-text-on-dark-muted)]">{item.size}</p>
                        </div>
                        <button type="button" aria-label="Remove item" className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-[color:var(--color-border-dark)] text-[color:var(--color-text-on-dark-muted)] transition order-[color:var(--color-accent)] hover:text-[color:var(--color-text-on-dark)]" onClick={(event) => {   event.stopPropagation();   removeItem(item.id, item.size); }} >
                            <DeleteOutlined  style={{color:"#EB4A2E"}}/>
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[color:var(--color-accent)]">Rs. {item.price}</span>
                        <div className="flex items-center overflow-hidden rounded-lg border border-[color:var(--color-border-dark)]">
                          <button type="button" className="grid h-8 w-8 place-items-center bg-[color:var(--color-surface-darker)] text-[color:var(--color-text-on-dark)]" onClick={(event) => {   event.stopPropagation();   updateQty(item.id, item.size, -1); }} >
                            -
                          </button>
                          <span className="grid h-8 w-10 place-items-center text-sm">{item.qty}</span>
                          <button type="button" className="grid h-8 w-8 place-items-center bg-[color:var(--color-surface-darker)] text-[color:var(--color-text-on-dark)]" onClick={(event) => {   event.stopPropagation();   updateQty(item.id, item.size, 1); }}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isFeaturedLoading && featuredProducts.length > 0 && (
                <div className="mt-5">
                  <div className="rounded-xl bg-[color:var(--color-surface-darker)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark-muted)]">
                    Frequently Bought Together
                  </div>
                  <div className="mt-4 space-y-4">
                    {featuredProducts.map((item, idx) => {
                      const size = getFirstVariantLabel(item);
                      const price = getVariantPrice(item, size);
                      return (
                        <div key={item._id || `${item.name}-${idx}`} role="button" tabIndex={0} onClick={() => {   setIsOpen(false);   navigate(ROUTES.getProductDetails(item._id || "")); }} onKeyDown={(event) => {   if (event.key === "Enter" || event.key === " ") {     event.preventDefault();     setIsOpen(false);     navigate(ROUTES.getProductDetails(item._id || ""));   } }} className="delvoura-cart-item-card flex gap-4 rounded-2xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-darker)] p-3">
                          <div className="h-16 w-16 overflow-hidden rounded-lg border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-dark)]">
                            {item.coverimage || item.images?.[0] ? (
                              <img src={item.coverimage || item.images?.[0] || ""} alt={item.name || "Product"} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark-muted)]">EDP</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="delvoura-cart-title text-sm font-semibold uppercase tracking-wide">{item.name}</h4>
                            <p className="text-sm text-[color:var(--color-text-on-dark-muted)]">Rs. {price}</p>
                            <button type="button" className="mt-2 text-xs text-[color:var(--color-accent)]" onClick={(event) => {   event.stopPropagation();   setIsOpen(false);   navigate(ROUTES.getProductDetails(item._id || "")); }} >
                              Show Details
                            </button>
                          </div>
                          <button type="button" className="delvoura-add-to-cart-btn self-center rounded-full border border-[color:var(--color-accent)] px-3 py-2 text-xs font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-secondary-bg)] " onClick={(event) => {   event.stopPropagation();   addToCart({ product: item, selectedVariant: size, quantity: 1, image: item.coverimage || item.images?.[0] || "" }); }} >
                            Add To Cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="delvoura-cart-footer border-t border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-dark)] px-5 py-4">
              <div className="mt-2 mb-3 flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <button type="button" disabled={!canCheckout} onClick={() => {   if (!canCheckout) return;   setIsOpen(false);   navigate(ROUTES.CHECKOUT); }}
                className="delvoura-checkout-btn mt-5 w-full rounded-2xl bg-[color:var(--color-accent)] py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50" style={{ color: "white" }}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
