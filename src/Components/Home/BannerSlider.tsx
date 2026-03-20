import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";

const slides = [
  {
    src: "https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png",
    alt: "Delvoura hero banner",
  },
  {
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2000&auto=format&fit=crop",
    alt: "Lifestyle product display",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop",
    alt: "Nature-inspired backdrop",
  },
];
 
const BannerSlider = () => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <div className="group relative w-full overflow-hidden">
      <Carousel ref={carouselRef} autoplay dots className="w-full">
        {slides.map((slide) => (
          <div key={slide.src} className="w-full">
            <div className="relative h-[100vh] w-full overflow-hidden sm:h-[70vh] lg:h-[80vh]">
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />
            </div>
          </div>
        ))}
      </Carousel>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => carouselRef.current?.prev()}
        className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-x-8 -translate-y-1/2 rounded-full border border-white/50 bg-black/45 text-white opacity-0 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur transition duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 hover:bg-black/65 h-12 w-12 sm:h-14 sm:w-14"
      >
        <LeftOutlined className="text-2xl !text-white transition group-hover:-translate-x-0.5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => carouselRef.current?.next()}
        className="pointer-events-none absolute right-4 top-1/2 z-20 translate-x-8 -translate-y-1/2 rounded-full border border-white/50 bg-black/45 text-white opacity-0 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur transition duration-300 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 hover:bg-black/65 h-12 w-12 sm:h-14 sm:w-14"
      >
        <RightOutlined className="text-2xl !text-white transition group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

export default BannerSlider;
