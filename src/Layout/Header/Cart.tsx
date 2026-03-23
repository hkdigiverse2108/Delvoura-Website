import { useState } from "react";
import { Drawer } from "antd";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = [
    {
      id: "promise",
      name: "Promise | Eau De Parfum",
      size: "50 ml",
      price: "Rs. 1,438.20",
      qty: 2,
    },
  ];

  const frequentlyBought = [
    {
      id: "sundarban",
      name: "Sundarban 50ml Perfume Spray",
      price: "Rs. 1,499.00",
    },
    {
      id: "oud-elixir",
      name: "Oud Elixir | Eau De Parfum",
      price: "Rs. 1,699.00",
    },
        {
      id: "oud-elixir",
      name: "Oud Elixir | Eau De Parfum",
      price: "Rs. 1,699.00",
    },    {
      id: "oud-elixir",
      name: "Oud Elixir | Eau De Parfum",
      price: "Rs. 1,699.00",
    },
  ];

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="delvoura-glow-pill delvoura-cart-btn relative grid h-11 w-11 place-items-center rounded-2xl transition" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls="delvoura-cart-drawer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 18a2 2 0 11.001 3.999A2 2 0 017 18zm10 0a2 2 0 11.001 3.999A2 2 0 0117 18zM7.2 6h13.6l-1.5 8.2a2 2 0 01-2 1.6H9.4a2 2 0 01-2-1.6L5 3H2V1h4l1.2 5z" />
        </svg>
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-bold text-[color:var(--color-text-on-dark)]">
          1
        </span>
      </button>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" width={420} mask closable={false} bodyStyle={{ padding: 0, background: "transparent" }} maskStyle={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 35%, transparent)", backdropFilter: "blur(6px)" }} contentWrapperStyle={{ borderRadius: "22px 0 0 22px", overflow: "hidden", height: "100vh" }} rootClassName="delvoura-cart-drawer delvoura-light-surface">
        <div className="h-full p-2.5">
          <div
            id="delvoura-cart-drawer"
            className="flex h-full flex-col overflow-hidden rounded-2xl bg-[color:var(--color-surface-dark)] text-[color:var(--color-text-on-dark)]"
            style={{
              boxShadow:
                "0 18px 50px color-mix(in srgb, var(--color-primary) 20%, transparent)",
            }}
          >
            <div className="flex items-center justify-between border-b border-[color:var(--color-border-dark)] px-5 py-4">
              <h3 className="text-base font-semibold tracking-wide">Your Cart (2)</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-border-dark)] text-lg transition hover:border-[color:var(--color-accent)]" aria-label="Close cart">
                x
              </button>
            </div>

            <div className="delvoura-cart-scroll flex-1 overflow-y-auto px-5 py-4">
              <div className="mt-2 border-b border-[color:var(--color-border-dark)] pb-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-darker)]">
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-on-dark-muted)]">
                        EDP
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide">{item.name}</h4>
                          <p className="text-xs text-[color:var(--color-text-on-dark-muted)]">{item.size}</p>
                        </div>
                        <button type="button" className="text-xs text-[color:var(--color-text-on-dark-muted)] transition hover:text-[color:var(--color-text-on-dark)]">
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[color:var(--color-accent)]">{item.price}</span>
                        <div className="flex items-center overflow-hidden rounded-lg border border-[color:var(--color-border-dark)]">
                          <button type="button" className="grid h-8 w-8 place-items-center bg-[color:var(--color-surface-darker)] text-[color:var(--color-text-on-dark)]">
                            -
                          </button>
                          <span className="grid h-8 w-10 place-items-center text-sm">{item.qty}</span>
                          <button type="button" className="grid h-8 w-8 place-items-center bg-[color:var(--color-surface-darker)] text-[color:var(--color-text-on-dark)]">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="rounded-xl bg-[color:var(--color-surface-darker)] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark-muted)]">
                  Frequently Bought Together
                </div>
                <div className="mt-4 space-y-4">
                  {frequentlyBought.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-darker)] p-3">
                      <div className="h-16 w-16 overflow-hidden rounded-lg border border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-dark)]">
                        <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark-muted)]">
                          EDP
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold uppercase tracking-wide">{item.name}</h4>
                        <p className="text-sm text-[color:var(--color-text-on-dark-muted)]">{item.price}</p>
                        <button type="button" className="mt-2 text-xs text-[color:var(--color-accent)]">
                          Show Details
                        </button>
                      </div>
                      <button type="button" className="delvoura-add-to-cart-btn self-center rounded-full border border-[color:var(--color-accent)] px-3 py-2 text-xs font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-secondary-bg)] ">
                        Add To Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[color:var(--color-border-dark)] bg-[color:var(--color-surface-dark)] px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm text-[color:var(--color-text-on-dark-muted)]">
                <span className="rounded-lg bg-[color:var(--color-surface-darker)] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">10% Off</span>
                <span className="text-xs text-[color:var(--color-text-on-dark-muted)]">Savings</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[color:var(--color-text-on-dark-muted)]">
                <span>Savings</span>
                <span>-Rs. 159.80</span>
              </div>
              <div className="mt-2 mb-3 flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>Rs. 1,438.20</span>
              </div>
              <button type="button" className="delvoura-checkout-btn mt-4 w-full rounded-2xl bg-[color:var(--color-accent)] py-3 text-sm font-semibold transition hover:brightness-110" > 
                <span className="text-white">Checkout</span> 
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
