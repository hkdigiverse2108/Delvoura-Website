import { useMemo } from "react";
import { useFormikContext } from "formik";
import type { CartItem } from "../../Utils/Hooks/useCart";
import { CommonTextInput } from "../../Attribute";
import type { CheckoutFormValues } from "../../Types";

type CheckoutSummaryProps = {
  items: CartItem[];
};

const CheckoutSummary = ({ items }: CheckoutSummaryProps) => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<CheckoutFormValues>();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const total = subtotal;

  return (
    <section className="rounded-2xl border border-[color:var(--color-border)] bg-white px-5 py-5">
      <h3 className="text-base font-semibold">Payment Summary</h3>

      <div className="mt-4 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
        <CommonTextInput name="discountCode" label="Discount Code" placeholder="Enter promo code" value={values.discountCode} onChange={(event) => setFieldValue("discountCode", event.target.value)} onBlur={() => undefined} touched={false} inputClassName="!h-[46px]" />
        <button type="button" className="h-[46px] rounded-md border border-[color:var(--color-border)] px-4 text-sm font-semibold text-[color:var(--color-text)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] focus:outline-none focus:ring-0 focus:border-[color:var(--color-accent)]" >
          Apply
        </button>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between text-[color:var(--color-text-muted)]">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-muted)]">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex items-center justify-between text-[color:var(--color-text-muted)]">
          <span>Discount</span>
          <span>Rs. 0</span>
        </div>
        <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-4 text-base font-semibold">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </div> <br />

      <button type="submit" disabled={items.length === 0 || isSubmitting} className="mt-7 w-full rounded-md bg-[color:var(--color-accent)] py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50" style={{ color: "white" }} >
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </section>
  );
};

export default CheckoutSummary;
