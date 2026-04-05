import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import ContactForm from "../../Components/Contact/ContactForm";
import { useEffect, useState } from "react";
import { BannerSlider } from "../../Components/Home";

const Contact = () => {
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
    <div className="delvoura-contact-page min-h-screen bg-[color:var(--color-card)] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999 ">
          <Header />
      </div>
        {!hideOfferBar && <OfferBar className="top-20" />}

      <BannerSlider />
      <ContactForm />
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default  Contact
