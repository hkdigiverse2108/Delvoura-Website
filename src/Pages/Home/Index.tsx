import { OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";
import SearchFilterBar from "../../Components/Home/SearchFilterBar";
import ProductGrid from "../../Components/Home/ProductGrid";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";

const MainHomePage = () => {
  return (
    <>
      <section className="relative w-full bg-[#f4f2ef]">
        <div className="sticky top-0 z-[550] w-full">
          <Header />
        </div>
        <OfferBar className="top-20" />
        <BannerSlider />
        <SearchFilterBar />
        <ProductGrid />
      </section>
      <AppFooter />
    </>
  );
};

export default MainHomePage;
