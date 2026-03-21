import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
            We collect only the information needed to process orders and improve your experience.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Personal data like name, phone, and address is used strictly for delivery and support.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Payment details are handled securely by trusted payment gateways.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We do not sell or rent your information to third parties.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]">
            Cookies & Tracking
          </h3>
          <p className="mt-2 text-base text-[color:var(--color-text-muted)]">
            Cookies help us remember preferences and provide a smoother checkout flow.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            You can disable cookies in your browser, but some features may not work.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            We may send updates about orders, offers, or new launches - you can opt out anytime.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Your data is stored with security safeguards to prevent unauthorized access.
          </p>
          <p className="text-base text-[color:var(--color-text-muted)]">
            Questions? Email us at support@delvoura.com for clarification.
          </p>
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  PrivacyPolicy
