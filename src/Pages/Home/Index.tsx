import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";
import SearchFilterBar from "../../Components/Home/SearchFilterBar";
import ProductGrid from "../../Components/Home/ProductGrid";
import NewsletterModal from "../../Components/ConfirmModel/NewsletterModal";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MainHomePage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const location = useLocation();
  
  //Newsletter Use Effect
  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length
      ? (navEntries[0] as PerformanceNavigationTiming).type === "reload"
      : false;

    const fromHero = sessionStorage.getItem("dv_from_hero") === "1";
    const shownCount = Number(sessionStorage.getItem("dv_newsletter_shown_count") || 0);

    if ((isReload || fromHero) && shownCount < 1) {
      const timer = window.setTimeout(() => {
        setNewsletterOpen(true);
        sessionStorage.setItem("dv_newsletter_shown_count", String(shownCount + 1));
        sessionStorage.removeItem("dv_from_hero");
      }, 3000);

      return () => window.clearTimeout(timer);
    }
  }, [location.key]);

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
    <>
      <section className="relative w-full bg-[color:var(--color-bg)]">
        <div className="sticky top-0 z-[550] w-full">
          <Header />
        </div>
       {!hideOfferBar && <OfferBar className="top-20" />}
        <BannerSlider />
        <SearchFilterBar />
        <ProductGrid />
        <InstagramScrollingSection />
      </section>
      <AppFooter />
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </>
  );
};

export default MainHomePage;
