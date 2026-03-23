import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const ShippingPolicy = () => {
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

      <section className="delvoura-container py-12">
        <div className="rounded-2xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-card)] p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-wide">
            Shipping Information
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            Orders are processed within 24-48 hours, excluding weekends and holidays.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Standard delivery timelines are 3-7 business days depending on location.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            You will receive a tracking link by email once your package is dispatched.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Please ensure your address and contact details are accurate at checkout.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Delivery Notes
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            If the package appears damaged, refuse delivery and contact support immediately.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Missed deliveries may be reattempted by the courier as per their policy.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            For high-demand launches, dispatch may take slightly longer than usual.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We currently ship only within India. International shipping will be announced soon.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Need help? Reach us at support@delvoura.com with your order ID.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  ShippingPolicy
