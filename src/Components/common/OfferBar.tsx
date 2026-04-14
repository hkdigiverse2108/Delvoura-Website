import { Queries } from "../../Api";
import type { TopbarApiResponse, TopbarItem } from "../../Types";

const OfferBar = ({ className = "" }: { className?: string }) => {
  const { data } = Queries.useGetTopbar();

  const payload = (data as TopbarApiResponse | undefined)?.data;
  const fromRoot = (payload as TopbarItem | undefined)?.topbarItems;
  const fromList = (payload as { topbar_data?: TopbarItem[] } | undefined)?.topbar_data?.find((item) => item?.isActive !== false && item?.isDeleted !== true)?.topbarItems;

  const items = (fromRoot && fromRoot.length > 0 ? fromRoot : fromList) ?? [];

  if (items.length === 0) return null;

  return (
    <div className={`fixed left-0 right-0 top-0 z-[500] mt-0 sm:mt-3 ${className}`}>
      <div className="delvoura-container h-auto rounded-xl bg-[#111111] px-2 py-1 sm:py-3 text-center text-[9px] sm:text-[14px] font-light tracking-[0.02em] text-[#ffffff]" style={{ boxShadow: "none", }}  >
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            {index < items.length - 1 && <span className="mx-1 text-[#7a7a7a]">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OfferBar
