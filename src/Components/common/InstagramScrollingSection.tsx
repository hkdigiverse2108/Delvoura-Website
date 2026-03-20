import { InstagramOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";

const { Title, Text } = Typography;

const placeholderImages = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx,
  src: "https://placehold.co/320x420/png?text=Delvoura",
}));

const InstagramScrollingSection = () => {
  const items = [...placeholderImages, ...placeholderImages];

  return (
    <section className="w-full overflow-x-hidden py-12">
      <div className="mx-auto w-[100%] max-w-6xl text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-[color:var(--color-text-on-dark)]"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-soft-accent))",
              boxShadow:
                "0 12px 30px -18px color-mix(in srgb, var(--color-accent) 90%, transparent)",
            }}
          >
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
        <div
          className="instagram-marquee overflow-hidden rounded-3xl bg-[color:var(--color-surface-dark)] px-[3px] py-3 sm:px-[4px]"
          style={{
            boxShadow:
              "0 18px 28px -20px color-mix(in srgb, var(--color-primary) 65%, transparent)",
          }}
        >
          <div className="instagram-track flex w-max items-center gap-[3px]">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative h-40 w-28 shrink-0 overflow-hidden rounded-[5px] bg-[color:var(--color-surface-dark)] sm:h-52 sm:w-36 md:h-64 md:w-48 lg:h-[300px] lg:w-[220px]"
                style={{
                  boxShadow:
                    "0 24px 45px -30px color-mix(in srgb, var(--color-primary) 75%, transparent)",
                }}
              >
                <img
                  src={item.src}
                  alt="Instagram placeholder"
                  className="h-full w-full object-cover transition duration-300 group-hover:opacity-60 "
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 5%, transparent), color-mix(in srgb, var(--color-primary) 55%, transparent))",
                  }}
                />
                <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full backdrop-blur"
                    style={{
                      background:
                        "color-mix(in srgb, var(--color-text-on-dark) 15%, transparent)",
                      color: "var(--color-text-on-dark)",
                    }}
                  >
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

export default InstagramScrollingSection
