import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import CheckoutItems from "./CheckoutItems";
import CheckoutSummary from "./CheckoutSummary";
import { readCart, type CartItem } from "../../Utils/Hooks/useCart";

const CheckoutContent = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const load = () => setItems(readCart());
    load();
    const onUpdate = () => load();
    window.addEventListener("delvoura-cart-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("delvoura-cart-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return (
    <section className="mx-auto w-[95%] max-w-[1280px] py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <CheckoutForm />
        <div className="space-y-6">
          <CheckoutItems items={items} />
          <CheckoutSummary items={items} />
        </div>
      </div>
    </section>
  );
};

export default CheckoutContent;
