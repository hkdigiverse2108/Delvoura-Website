import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const RefundPolicy = () => {
      const [hideOfferBar, setHideOfferBar] = useState(false);


    //hide offerbar
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 70) return setHideOfferBar(true);
        return setHideOfferBar(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
  return (
    <div className="delvoura-privacy-policy-page min-h-screen bg-[color:var(--color-card)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999 ">
          <Header />
      </div>
        {!hideOfferBar && <OfferBar className="top-20" />}

      <div className="h-[55vh] w-full bg-center bg-cover" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png')", }}/>

      <section className="mx-auto w-[92%] max-w-8xl py-12">
        <div className="rounded-2xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-card)] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-wide">
            Refund Policy
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            Refunds are issued only for damaged, defective, or incorrect items.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Report issues within 24 hours of delivery with photos and an unboxing video.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Once approved, refunds are processed to the original payment method.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Refund timelines vary by bank, typically 5-10 business days.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Important Notes
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            Items must be unused and in original packaging for claims to be valid.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Fragrance preferences are subjective, so refunds are not available for smell changes.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            For missing items, contact us with your order ID and unboxing details.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We may request additional information to resolve the claim quickly.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Need help? Write to support@delvoura.com.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  RefundPolicy
