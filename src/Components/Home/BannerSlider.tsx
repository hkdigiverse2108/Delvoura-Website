import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useMemo, useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";
import { Queries } from "../../Api";
import type { BannerApiResponse, BannerItem } from "../../Types";
 
const BannerSlider = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const { data } = Queries.useGetBanner();

  type BannerSlide = {
    src: string;
    alt: string;
    isActive?: boolean;
    isDeleted?: boolean;
  };

  const extractBannerItems = (payload: BannerApiResponse["data"]): BannerItem[] => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (typeof payload === "object" && ("banner_data" in payload || "banners" in payload)) {
      const wrapper = payload as { banner_data?: BannerItem[]; banners?: BannerItem[] };
      return wrapper.banner_data || wrapper.banners || [];
    }
    return [payload as BannerItem];
  };

  const bannerItems = useMemo<BannerItem[]>(() => extractBannerItems(data?.data), [data]);

  const getImageSrc = (raw: string) => {
    if (!raw) return "";
    if (/^(https?:|data:|blob:)/i.test(raw)) return raw;
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    if (!baseUrl) return raw;
    if (raw.startsWith("/")) return `${baseUrl}${raw}`;
    return `${baseUrl}/${raw}`;
  };

  const dynamicSlides = useMemo<BannerSlide[]>( () =>
      bannerItems
        .flatMap((item: BannerItem) => {
          const images = item.bannerImages || [];
          return images.map((img: string) => ({
          src: getImageSrc(img),
          alt: "Banner",
          isActive: item.isActive,
          isDeleted: item.isDeleted,
          }));
        })
        .filter((item) => item.src && item.isDeleted !== true && item.isActive !== false),
    [bannerItems]
  );

  if (!dynamicSlides.length) {
    return null;
  }

  const showNav = dynamicSlides.length > 1;

  return (
    <div className="group relative w-full overflow-hidden">
      <Carousel ref={carouselRef} autoplay dots className="w-full">
        {dynamicSlides.map((slide, index) => (
          <div key={slide.src} className="w-full">
            <div className="delvoura-banner-frame relative w-full overflow-hidden">
              <img src={slide.src} alt={slide.alt} className="delvoura-banner-image h-full w-full object-cover object-center" loading={index === 0 ? "eager" : "lazy"} />
              <div  className="pointer-events-none absolute inset-0"  style={{  background:  "color-mix(in srgb, var(--color-primary) 10%, transparent)",  }} />
            </div>
          </div>
        ))}
      </Carousel>

      {showNav && (
        <>
          <button  type="button"  aria-label="Previous slide"  onClick={() => carouselRef.current?.prev()}  className="delvoura-slider-nav delvoura-slider-nav-left absolute left-4 top-1/2 h-12 w-12 sm:h-14 sm:w-14"  >
            <LeftOutlined className="text-2xl transition group-hover:-translate-x-0.5" />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => carouselRef.current?.next()} className="delvoura-slider-nav delvoura-slider-nav-right absolute right-4 top-1/2 h-12 w-12 sm:h-14 sm:w-14" >
            <RightOutlined className="text-2xl transition group-hover:translate-x-0.5" />
          </button>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
