import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Index";
import { ROUTES } from "../../Constants";
import { OfferBar } from "../../Components/common";

const Index = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f4f2ef]">
      <div className="absolute inset-0" style={{ backgroundImage: "url('//www.houseofem5.com/cdn/shop/files/SKY_partnership_1.png?v=1770352832')",  backgroundSize: "cover", backgroundPosition: "center",}}/>
      <div className="relative z-10 flex h-full flex-col px-6 py-4 pt-16">
        <OfferBar />

        <div className="delvoura-hero-header mx-auto w-[90%] pt-4">
          <Header />
        </div>

        <div className="flex flex-1 items-end justify-center pb-8">
          <Button  type="primary"  size="large"  className="h-20 min-w-[200px] rounded-full px-28 text-3xl font-bold tracking-[0.22em]"  style={{  background: "rgba(0,0,0,0.9)",  border: "5px solid #7a2e3e",  boxShadow: "0 18px 40px -24px rgba(0,0,0,0.9)",  height: "70px",  lineHeight: "100px",}}  onClick={() => navigate(ROUTES.COLLECTIONS_ALL)}>
            Shop All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
