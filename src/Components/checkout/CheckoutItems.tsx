import type { CartItem } from "../../Utils/Hooks/useCart";

type CheckoutItemsProps = {
  items: CartItem[];
};

const CheckoutItems = ({ items }: CheckoutItemsProps) => {
  if (!items.length) {
    return (
      <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
        <h3 className="text-base font-semibold">Order Summary</h3>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-[color:var(--color-text-muted)]">
          <img src="/assets/images/order/emptyCart.png" alt="Empty cart" className="w-28 opacity-80" />
          <div>Your cart is empty.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
      <h3 className="text-base font-semibold">Order Summary</h3>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex items-start gap-4 border-b border-dashed border-[color:var(--color-border)] pb-4 last:border-b-0 last:pb-0"
          >
            <div className="h-16 w-16 overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] uppercase text-[color:var(--color-text-muted)]">
                  EDP
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs text-[color:var(--color-text-muted)]">{item.size}</div>
                  <div className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                    Qty: {item.qty}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-[color:var(--color-accent)]">
                    Rs. {item.price * item.qty}
                  </div>
                  <div className="text-xs text-[color:var(--color-text-muted)] line-through">
                    Rs. {Math.round(item.price * item.qty * 1.2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CheckoutItems;
