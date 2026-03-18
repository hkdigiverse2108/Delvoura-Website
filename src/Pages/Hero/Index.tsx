import { Button } from "antd";
import Header from "../../Layout/Header/Index";

const Index = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f4f2ef]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('//www.houseofem5.com/cdn/shop/files/SKY_partnership_1.png?v=1770352832')", // add hero image url here
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 flex h-full flex-col px-6 py-4">
        <div className="mx-auto h-auto w-[90%] rounded-xl bg-black/90 px-2 py-3 text-center text-[13px] text-sm-[10px] font-medium  tracking-[0.08em] text-white shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]">
          Free Shipping above 999 INR | FLAT 10% OFF above 1499 INR and 20% OFF On
          Orders above 2499 INR (Automatically Applied) | COD Eligible Above 999
          INR
        </div>

        <div className="delvoura-hero-header mx-auto w-[90%] pt-4">
          <Header />
        </div>

        <div className="flex flex-1 items-end justify-center pb-8">
          <Button
            type="primary"
            size="large"
            className="h-20 min-w-[200px] rounded-full px-28 text-3xl font-bold tracking-[0.22em]"
            style={{
              background: "rgba(0,0,0,0.9)",
              border: "5px solid #7a2e3e",
              boxShadow: "0 18px 40px -24px rgba(0,0,0,0.9)",
              height: "70px",
              lineHeight: "100px",
            }}
          >
            Shop All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
