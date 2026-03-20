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
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-accent)] text-[10px] font-bold text-white">
          1
        </span>
      </button>

      <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right" width={420} mask closable={false} bodyStyle={{ padding: 0, background: "transparent" }} maskStyle={{ backgroundColor: "rgba(10,6,8,0.35)", backdropFilter: "blur(6px)" }} contentWrapperStyle={{ borderRadius: "22px 0 0 22px", overflow: "hidden", height: "100vh" }} rootClassName="delvoura-cart-drawer">
        <div className="h-full p-2.5">
          <div id="delvoura-cart-drawer" className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-[#1a1a1a] shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h3 className="text-base font-semibold tracking-wide">Your Cart (2)</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-lg transition hover:border-black/30" aria-label="Close cart">
                x
              </button>
            </div>

            <div className="delvoura-cart-scroll flex-1 overflow-y-auto px-5 py-4">
              <div className="mt-2 border-b border-black/10 pb-5">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-black/10 bg-[#f6f0f2]">
                      <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-black/50">
                        EDP
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wide">{item.name}</h4>
                          <p className="text-xs text-black/50">{item.size}</p>
                        </div>
                        <button type="button" className="text-xs text-black/50 transition hover:text-black">
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[color:var(--color-accent)]">{item.price}</span>
                        <div className="flex items-center overflow-hidden rounded-lg border border-black/10">
                          <button type="button" className="grid h-8 w-8 place-items-center bg-black/5 text-black">
                            -
                          </button>
                          <span className="grid h-8 w-10 place-items-center text-sm">{item.qty}</span>
                          <button type="button" className="grid h-8 w-8 place-items-center bg-black/5 text-black">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="rounded-xl bg-[#f6f0f2] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-black/70">
                  Frequently Bought Together
                </div>
                <div className="mt-4 space-y-4">
                  {frequentlyBought.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-2xl border border-black/10 bg-[#f6f0f2] p-3">
                      <div className="h-16 w-16 overflow-hidden rounded-lg border border-black/10 bg-white">
                        <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-[0.25em] text-black/50">
                          EDP
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold uppercase tracking-wide">{item.name}</h4>
                        <p className="text-sm text-black/70">{item.price}</p>
                        <button type="button" className="mt-2 text-xs text-[color:var(--color-accent)]">
                          Show Details
                        </button>
                      </div>
                      <button type="button" className="self-center rounded-full border border-[color:var(--color-accent)] px-3 py-2 text-xs font-semibold text-[color:var(--color-accent)] transition hover:bg-[color:var(--color-accent)] hover:!text-white">
                        Add To Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 bg-white px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm text-black/60">
                <span className="rounded-lg bg-black/5 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">10% Off</span>
                <span className="text-xs text-black/50">Savings</span>
              </div>
              <div className="flex items-center justify-between text-sm text-black/60">
                <span>Savings</span>
                <span>-Rs. 159.80</span>
              </div>
              <div className="mt-2 mb-3 flex items-center justify-between text-base font-semibold">
                <span>Subtotal</span>
                <span>Rs. 1,438.20</span>
              </div>
              <button type="button" className="mt-4 w-full rounded-2xl bg-[color:var(--color-accent)] py-3 text-sm font-semibold text-white transition hover:brightness-110" style={{color:"white"}} >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </Drawer>

      <style>{`
        .delvoura-cart-drawer .ant-drawer-content {
          background: transparent;
        }
        .delvoura-cart-drawer .ant-drawer-body {
          background: transparent;
        }
        .delvoura-cart-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .delvoura-cart-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      `}</style>
    </>
  );
};

export default Cart;
