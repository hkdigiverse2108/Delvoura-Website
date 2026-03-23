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
    src: "https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png",
    alt: "Lifestyle product display",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png",
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
            <div className="relative h-[50vh] w-full overflow-hidden sm:h-[70vh] lg:h-[50vh]">
              <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover object-center" loading="eager"/>
              <div  className="pointer-events-none absolute inset-0"  style={{  background:  "color-mix(in srgb, var(--color-primary) 10%, transparent)",  }} />
            </div>
          </div>
        ))}
      </Carousel>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => carouselRef.current?.prev()}
        className="delvoura-slider-nav delvoura-slider-nav-left absolute left-4 top-1/2 h-12 w-12 sm:h-14 sm:w-14"
      >
        <LeftOutlined className="text-2xl transition group-hover:-translate-x-0.5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => carouselRef.current?.next()}
        className="delvoura-slider-nav delvoura-slider-nav-right absolute right-4 top-1/2 h-12 w-12 sm:h-14 sm:w-14"
      >
        <RightOutlined className="text-2xl transition group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};

export default BannerSlider;
