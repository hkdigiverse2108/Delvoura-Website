import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const TermsConditions = () => {
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
            Terms & Conditions
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            By using this website, you agree to comply with Delvoura's terms.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Product images are for representation; actual packaging may vary slightly.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Prices and offers are subject to change without prior notice.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We reserve the right to cancel orders if payment fails or stock is unavailable.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Usage & Conduct
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            Users must not misuse the website or attempt unauthorized access.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Content on this site is protected and cannot be reused without permission.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Delvoura is not liable for delays caused by courier or external factors.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            For legal queries, contact support@delvoura.com.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  TermsConditions
