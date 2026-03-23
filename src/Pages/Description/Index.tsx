import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Queries } from "../../Api";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import { ProductAccordions, ProductGallery, ProductInfo, ProductReviews, RelatedProductsSlider } from "../../Components/Description";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";

const ProductDescription = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const { id } = useParams();
  const { data } = Queries.useGetProductById(id);
  const product = data?.data || null;

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

        <div className="delvoura-product-page">
          <div className="delvoura-product-shell">
            <div className="delvoura-product-hero">
              <ProductGallery product={product} />
              <div className="delvoura-product-right">
                <ProductInfo product={product} />
                <ProductAccordions product={product} />
              </div>
            </div> <br /><br /><br />
            <RelatedProductsSlider /> <br /><br />
            <ProductReviews /> <br /><br />
            <InstagramScrollingSection containerClassName="w-full" />
          </div>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default ProductDescription;
