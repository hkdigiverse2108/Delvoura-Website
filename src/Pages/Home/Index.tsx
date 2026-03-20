import { OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";
import SearchFilterBar from "../../Components/Home/SearchFilterBar";
import ProductGrid from "../../Components/Home/ProductGrid";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { useEffect, useState } from "react";

const MainHomePage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 300) return setHideOfferBar(true);
          else return setHideOfferBar(false);
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
      </section>
      <AppFooter />
    </>
  );
};

export default MainHomePage;
