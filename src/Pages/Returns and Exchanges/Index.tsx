import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const ReturnExchangePolicy = () => {
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
            Returns & Exchanges
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            We accept returns only for damaged or incorrect items delivered.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Contact support within 24 hours with an unboxing video and clear photos.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            If approved, we will arrange a replacement or offer a refund.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Exchanges are subject to stock availability of the same product.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Eligibility
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            Items must be unused, sealed, and returned in original packaging.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Requests raised after 24 hours may not be accepted.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Courier damage must be reported at the time of delivery for faster resolution.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            For any questions, reach us at support@delvoura.com.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  ReturnExchangePolicy
