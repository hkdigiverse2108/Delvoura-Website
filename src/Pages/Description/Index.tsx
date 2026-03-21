import { useEffect, useState } from "react";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { ProductAccordions, ProductGallery, ProductInfo, ProductReviews, RelatedProductsSlider } from "../../Components/Description";
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
            </div> <br /><br /><br />
            <RelatedProductsSlider /> <br /><br />
            <ProductReviews /> <br /><br />
            <InstagramScrollingSection containerClassName="w-full max-w-none" />
          </div>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default ProductDescription;
