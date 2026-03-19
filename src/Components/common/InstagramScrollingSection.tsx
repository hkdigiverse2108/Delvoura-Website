import { InstagramOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;

const placeholderImages = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx,
  src: "https://placehold.co/320x420/png?text=Delvoura",
}));

export const InstagramScrollingSection = () => {
  const items = [...placeholderImages, ...placeholderImages];

  return (
    <section className="w-full overflow-x-hidden py-12">
      <div className="mx-auto w-[100%] max-w-6xl text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff7a45,#f15b3f)] text-white shadow-[0_12px_30px_-18px_rgba(255,122,69,0.9)]">
            <InstagramOutlined className="text-2xl" />
          </span>
          <Title level={3} className="!m-0 !text-[color:var(--color-text)]">
            Catch the Delvoura on Instagram!
          </Title>
        </div>
        <Text className="text-[color:var(--color-text-muted)]">
          A curated feed of aroma, artistry, and allure—join the fragrance
          journey.
        </Text>
      </div>

      <div className="mx-auto mt-8 w-[95%] max-w-6xl overflow-x-hidden">
        <div className="instagram-marquee overflow-hidden rounded-3xl bg-[#120d16] px-[3px] py-3 shadow-[0_18px_28px_-20px_rgba(0,0,0,0.65)] sm:px-[4px]">
          <div className="instagram-track flex w-max items-center gap-[3px]">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative h-40 w-28 shrink-0 overflow-hidden rounded-[5px] bg-[#120d16] shadow-[0_24px_45px_-30px_rgba(0,0,0,0.75)] sm:h-52 sm:w-36 md:h-64 md:w-48 lg:h-[300px] lg:w-[220px]"
              >
                <img
                  src={item.src}
                  alt="Instagram placeholder"
                  className="h-full w-full object-cover transition duration-300 group-hover:opacity-60 "
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.55))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                    <PlayCircleFilled className="text-3xl" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .instagram-track {
            animation: delvoura-marquee 26s linear infinite;
          }

          .instagram-marquee:hover .instagram-track {
            animation-play-state: paused;
          }

          @keyframes delvoura-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .instagram-marquee {
            max-width: 100%;
          }
        `}
      </style>
    </section>
  );
};
