import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { CartItem } from "../../Utils/Hooks/useCart";

type CheckoutItemsProps = {
  items: CartItem[];
};

const CheckoutItems = ({ items }: CheckoutItemsProps) => {
  const navigate = useNavigate();

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
          <div key={`${item.id}-${item.size}`} role="button" tabIndex={0} onClick={() => navigate(ROUTES.getProductDetails(item.id))}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(ROUTES.getProductDetails(item.id));
              }
            }}
            className="flex cursor-pointer items-start gap-4 border-b border-dashed border-[color:var(--color-border)] pb-4 transition hover:bg-[color:var(--color-card)] last:border-b-0 last:pb-0"
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
                  <div className="text-sm font-semibold" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", }} title={item.name} >
                    {item.name}
                  </div>
                  <div className="text-xs text-[color:var(--color-text-muted)]">{item.size}</div>
                  <div className="mt-2 text-xs text-[color:var(--color-text-muted)]">
                    Qty: {item.qty}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1 text-sm font-semibold text-[color:var(--color-accent)]">
                    <span>Rs.</span>
                    <span>{item.price * item.qty}</span>
                  </div>
                  <div className="flex items-baseline justify-end gap-1 text-xs text-[color:var(--color-text-muted)] line-through">
                    <span>Rs.</span>
                    <span>{Math.round(item.price * item.qty * 1.2)}</span>
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
