import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const TermsOfService = () => {
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
            Terms of Service
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            These terms govern your access to and use of Delvoura's services.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            By placing an order, you confirm that the information provided is accurate.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We may update the site content or policies at any time without notice.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Account activity is your responsibility; keep your credentials secure.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Service Commitments
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            We strive to deliver authentic products with quality checks before dispatch.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Service interruptions may occur due to maintenance or technical reasons.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            For support, please reach us at support@delvoura.com.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Continued use of the website indicates acceptance of these terms.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  TermsOfService
