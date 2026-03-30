import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Index";
import { ROUTES } from "../../Constants";
import { OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";

const Index = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[color:var(--color-bg)]">
      <div className="delvoura-hero-banner absolute inset-0">
        <BannerSlider />
      </div>
      <div className="relative z-10 flex h-full flex-col py-4 pt-16">
        <OfferBar />

        <div className="delvoura-hero-header pt-4 w-[90%] m-auto">
          <Header />
        </div>

        <div className="flex flex-1 items-end justify-center pb-8">
        <Button type="primary" size="large" className="delvoura-hero-btn h-20 min-w-[200px] rounded-full px-28 text-3xl font-bold tracking-[0.22em]" onClick={() => { sessionStorage.setItem("dv_from_hero", "1"); sessionStorage.setItem("dv_newsletter_shown_count", "0"); navigate(ROUTES.COLLECTIONS_ALL, { state: { fromHero: true } }); }} >
          Shop All
        </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
