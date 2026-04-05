import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { EmptyState, InstagramScrollingSection, OfferBar } from "../../Components/common";
import { useEffect, useState } from "react";
import { Queries } from "../../Api";
import { BannerSlider } from "../../Components/Home";

const TermsOfService = () => {
      const [hideOfferBar, setHideOfferBar] = useState(false);
      const { data: termsData, isLoading: isTermsLoading } = Queries.useGetTermsService();
      const termsContent = (termsData as { data?: { content?: string } })?.data?.content ?? null;

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

      {/* <div className="h-[55vh] w-full bg-center bg-cover" style={{ backgroundImage: "url('https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png')", }}/> */}
      <BannerSlider />

      <section className="delvoura-container py-12">
        <div className="rounded-2xl border border-[color:var(--color-border-dark)] bg-[color:var(--color-card)] p-8 shadow-sm">
 
          {isTermsLoading && (
            <p className="mt-4 text-base text-[color:var(--color-text-muted)]">
              Loading terms of service...
            </p>
          )}
          {!isTermsLoading && termsContent && (
            <div
              className="terms-content delvoura-html mt-6 text-[color:var(--color-text-muted)] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[color:var(--color-text)] [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[color:var(--color-text)] [&_h3]:mt-5 [&_p]:text-base [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-base [&_li]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: termsContent }}
            />
          )}
          {!isTermsLoading && !termsContent && (
            <EmptyState className="mt-8" message="Terms of service content is not available right now." imageAlt="No terms of service" imageClassName="mx-auto w-40 opacity-80" />
          )}
        </div>
      </section>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  TermsOfService
