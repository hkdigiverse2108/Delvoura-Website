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
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) return setHideOfferBar(true);
          else return setHideOfferBar(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length
      ? (navEntries[0] as PerformanceNavigationTiming).type === "reload"
      : false;

    const hasHeroFlag = sessionStorage.getItem("dv_show_newsletter") === "1";

    if (!isReload && !hasHeroFlag) {
      setNewsletterOpen(false);
      return;
    }

    if (hasHeroFlag) sessionStorage.removeItem("dv_show_newsletter");

    const timer = window.setTimeout(() => {
      setNewsletterOpen(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [location.key]);

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
