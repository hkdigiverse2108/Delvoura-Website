import { InstagramOutlined, PlayCircleFilled } from "@ant-design/icons";
import { Typography } from "antd";
import { Queries } from "../../Api/Queries";
import type { InstagramItem } from "../../Types";

const { Title, Text } = Typography;

const placeholderImages = Array.from({ length: 8 }).map((_, idx) => ({
  id: idx,
  src: "https://placehold.co/320x420/png?text=Delvoura",
}));

type InstagramCardItem = {
  id: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  link?: string | null;
  isPlaceholder?: boolean;
};

const resolveMediaUrl = (raw?: string | null) => {
  if (!raw) return "";
  if (/^(https?:|data:|blob:)/i.test(raw)) return raw;
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  if (!baseUrl) return raw;
  if (raw.startsWith("/")) return `${baseUrl}${raw}`;
  return `${baseUrl}/${raw}`;
};

const normalizeInstagramItems = (items: InstagramItem[] | undefined | null): InstagramCardItem[] => {
  if (!items || items.length === 0) {
    return placeholderImages.map((item) => ({ id: `placeholder-${item.id}`, imageUrl: item.src, link: null, videoUrl: null, isPlaceholder: true }));
  }

  return items.map((item, index) => ({
    id: item._id || `instagram-${index}`,
    imageUrl: item.imageUrl ?? null,
    videoUrl: item.videoUrl ?? null,
    link: item.link ?? null,
    isPlaceholder: false,
  }));
};

const InstagramScrollingSection = ({ containerClassName = "delvoura-container" }: { containerClassName?: string }) => {
  const { data } = Queries.useGetInstagrams({ status: "active" });
  const normalizedItems = normalizeInstagramItems(data?.data?.instagram_data);
  const items = [...normalizedItems, ...normalizedItems];
  const fallbackImage = placeholderImages[0]?.src;

  return (
    <section className="w-full overflow-x-hidden py-12">
      <div className={`${containerClassName} text-center`}>
        <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-[color:var(--color-text-on-dark)]" style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-soft-accent))", boxShadow: "0 12px 30px -18px color-mix(in srgb, var(--color-accent) 90%, transparent)" }}>
            <InstagramOutlined className="text-2xl" />
          </span>
          <Title level={3} className="!m-0 !text-[color:var(--color-text)] text-center">Catch the Delvoura on Instagram!</Title>
        </div>
        <Text className="text-[color:var(--color-text-muted)]">A curated feed of aroma, artistry, and allureâ€”join the fragrance journey.</Text>
      </div>

      <div className={`mt-8 ${containerClassName} overflow-x-hidden`}>
        <div className="instagram-marquee overflow-hidden rounded-3xl bg-[color:var(--color-surface-dark)] px-[3px] py-3 sm:px-[4px]" style={{ boxShadow: "0 18px 28px -20px color-mix(in srgb, var(--color-primary) 65%, transparent)" }}>
          <div className="instagram-track flex w-max items-center gap-[3px]">
            {items.map((item, index) => {
              const resolvedVideoUrl = resolveMediaUrl(item.videoUrl ?? undefined);
              const resolvedImageUrl = resolveMediaUrl(item.imageUrl ?? undefined);
              const hasVideo = Boolean(resolvedVideoUrl);
              const hasImage = Boolean(resolvedImageUrl);
              const shouldUseFallback = !hasVideo && !hasImage;
              const media = hasVideo ? (
                <video className="h-full w-full object-cover transition duration-300 group-hover:opacity-60" src={resolvedVideoUrl || undefined} muted loop playsInline autoPlay preload="metadata" />
              ) : (
                <img className="h-full w-full object-cover transition duration-300 group-hover:opacity-60" src={shouldUseFallback ? fallbackImage : resolvedImageUrl || undefined} alt="Instagram media" />
              );

              const card = (
                <div className="group relative h-40 w-28 shrink-0 overflow-hidden rounded-[5px] bg-[color:var(--color-surface-dark)] sm:h-52 sm:w-36 md:h-64 md:w-48 lg:h-[300px] lg:w-[220px]" style={{ boxShadow: "0 24px 45px -30px color-mix(in srgb, var(--color-primary) 75%, transparent)" }}>
                  {media}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 5%, transparent), color-mix(in srgb, var(--color-primary) 55%, transparent))" }} />
                  <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="grid h-14 w-14 place-items-center rounded-full backdrop-blur" style={{ background: "color-mix(in srgb, var(--color-text-on-dark) 15%, transparent)", color: "var(--color-text-on-dark)" }}>
                      <PlayCircleFilled className="text-3xl" />
                    </span>
                  </div>
                </div>
              );

              if (item.link) {
                return (
                  <a key={`${item.id}-${index}`} href={item.link} target="_blank" rel="noreferrer" className="block">
                    {card}
                  </a>
                );
              }

              return <div key={`${item.id}-${index}`} className="block">{card}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramScrollingSection;
