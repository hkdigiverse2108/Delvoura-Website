import { useEffect, useState } from "react";
import { OfferBar } from "../../Components/common";
import { ProductAccordions, ProductGallery, ProductInfo, ProductReviews } from "../../Components/Description";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";

const ProductDescription = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);

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
      <section className="relative w-full bg-white">
        <div className="sticky top-0 z-[550] w-full">
          <Header />
        </div>
        {!hideOfferBar && <OfferBar className="top-20" />}

        <div className="delvoura-product-page">
          <div className="delvoura-product-shell">
            <div className="delvoura-product-hero">
              <ProductGallery />
              <div className="delvoura-product-right">
                <ProductInfo />
                <ProductAccordions />
              </div>
            </div>
            <ProductReviews />
          </div>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default ProductDescription;
