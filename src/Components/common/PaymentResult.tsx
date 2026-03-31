import { Button } from "antd";
import { Link } from "react-router-dom";
import type { PaymentResultProps } from "../../Types";
import { isPaymentSuccess, normalizePaymentStatus } from "./payment";

const PaymentResult = ({ status, title, description, note, primaryCtaLabel, primaryCtaHref, secondaryCtaLabel, secondaryCtaHref,}: PaymentResultProps) => {
  const resolvedStatus = normalizePaymentStatus(status);
  const isSuccess = isPaymentSuccess(resolvedStatus);

  const resolvedTitle = title ?? (isSuccess ? "Order placed successfully" : "Payment failed");
  const resolvedDescription = description ?? (isSuccess ? "Thanks for shopping with Delvoura. Your order is confirmed." : "Your payment did not go through. Please try again.");
  const resolvedNote = note ?? (isSuccess ? "A confirmation message will be sent to your email shortly." : "No money was deducted. You can retry with a different method.");

  const accentColor = isSuccess ? "#2f9e44" : "#e11d48";
  const accentSoft = isSuccess ? "rgba(47, 158, 68, 0.16)" : "rgba(225, 29, 72, 0.16)";

  const primaryLabel = primaryCtaLabel ?? (isSuccess ? "Continue Shopping" : "Try Again");
  const primaryHref = primaryCtaHref ?? "/collections/all";
  const secondaryLabel = secondaryCtaLabel ?? (isSuccess ? "View Orders" : "Contact Support");
  const secondaryHref = secondaryCtaHref ?? (isSuccess ? "/profile" : "/contact");

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div
        className="w-full max-w-2xl rounded-[28px] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 shadow-[0_40px_90px_-70px_rgba(0,0,0,0.45)] sm:p-10"
        style={{
          background: `radial-gradient(140% 120% at 0% 0%, ${accentSoft}, transparent 58%), linear-gradient(180deg, #ffffff, #fbfaf9)`,
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white shadow-[0_20px_40px_-30px_rgba(0,0,0,0.35)]">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isSuccess ? "bg-[color:var(--color-secondary-bg)]" : "bg-rose-50"}`}>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: accentColor }}
              >
                {isSuccess ? (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                    <path d="M1.5 7.5L6.5 12L16.5 1.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" >
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-[color:var(--color-text)] sm:text-3xl">
            {resolvedTitle}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-text-muted)] sm:text-base">
            {resolvedDescription}
          </p>

          <div
            className="mt-7 flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm sm:text-base text-[color:var(--color-text)]"
            style={{
              borderColor: isSuccess ? "rgba(47, 158, 68, 0.45)" : "rgba(225, 29, 72, 0.35)",
              backgroundColor: isSuccess ? "rgba(47, 158, 68, 0.08)" : "rgba(225, 29, 72, 0.08)",
            }}
          >
            <div
              className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-18px_rgba(0,0,0,0.35)]"
              style={{ color: accentColor }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 3.6v.6M6 6.1h1V10H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
              </svg>
            </div>
            <span>{resolvedNote}</span>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {primaryHref ? (
              <Link to={primaryHref}>
                <Button type="primary" className="btn primary_btn !h-11 !px-6 !rounded-full !shadow-[0_16px_30px_-20px_rgba(0,0,0,0.25)]" style={{ backgroundColor: accentColor, borderColor: accentColor }} >
                  {primaryLabel}
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                className="btn primary_btn !h-11 !px-6 !rounded-full !shadow-[0_16px_30px_-20px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: accentColor, borderColor: accentColor }}
              >
                {primaryLabel}
              </Button>
            )}

            {secondaryHref ? (
              <Link to={secondaryHref}>
                <Button className="btn border-primary_btn !h-11 !px-6 !rounded-full" style={{ borderColor: accentColor, color: accentColor }}>
                  {secondaryLabel}
                </Button>
              </Link>
            ) : (
              <Button className="btn border-primary_btn !h-11 !px-6 !rounded-full" style={{ borderColor: accentColor, color: accentColor }}>
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
