import { useEffect, useRef, useState } from "react";
import { Button, ConfigProvider, Select } from "antd";
import { CloseOutlined, DownOutlined, SlidersOutlined } from "@ant-design/icons";
import SearchBarWithModal from "../../Layout/Header/SearchBarWithModel";

const sortOptions = [
  { value: "new", label: "New Arrivals" },
  { value: "best", label: "Best Seller" },
  { value: "price-desc", label: "Price descending" },
  { value: "created-asc", label: "Created ascending" },
  { value: "relevance", label: "Relevance" },
  { value: "title-asc", label: "Title ascending" },
  { value: "title-desc", label: "Title descending" },
];

const filterSections = [
  { title: "Gender", items: ["Women", "Men", "Unisex"] },
  {
    title: "Scent Profile",
    items: [ "Amber", "Animalic", "Aquatic", "Aromatic", "Citrus", "Earthy", "Floral", "Fresh", "Fruity", "Gourmand", "Green", "Incense", "Leather", "Musky", "Mysterious", "Oriental", "Oud", "Patchouli", "Smoky", "Spicy", "Tobacco", "Vanilla", "Woody",],
  },
];

const SearchFilterBar = () => {
  const [sortValue, setSortValue] = useState("new");
  const [showFilters, setShowFilters] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!showFilters) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (filterBtnRef.current?.contains(target)) return;
      setShowFilters(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilters]);

  return (
    <section className="delvoura-home-filter-strip w-full">
      <div className="mx-auto w-[90%] max-w-[1400px]">
        <div className="delvoura-home-filter-bar w-full">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full flex-1 md:max-w-[620px]">
                <SearchBarWithModal showOnMobile buttonText="Search" buttonClassName="delvoura-home-search-btn w-full"/>
              </div>
              <Button type="default" icon={showFilters ? <CloseOutlined /> : <SlidersOutlined />} className="delvoura-filter-btn" ref={filterBtnRef} onClick={() => setShowFilters((prev) => !prev)}>
                Filter
              </Button>
            </div>

            <div className="lg:ml-auto">
              <ConfigProvider theme={{token: {colorPrimary: "var(--color-accent)",colorBorder: "rgba(255,255,255,0.25)",colorText: "var(--color-text)",colorTextPlaceholder: "var(--color-text-muted)",colorBgContainer: "rgba(16,12,18,0.9)",},}}>
                <Select value={sortValue} onChange={setSortValue} options={sortOptions} size="large" suffixIcon={<DownOutlined />} className="delvoura-sort-select" popupClassName="delvoura-sort-dropdown" style={{color:"white"}} getPopupContainer={() => document.body} />
              </ConfigProvider>
            </div>
          </div>
        </div>

        {showFilters && (
          <div ref={panelRef} className="delvoura-filter-panel mt-5 w-full">
            {filterSections.map((section) => (
              <div key={section.title} className="delvoura-filter-row">
                <div className="delvoura-filter-title">{section.title}</div>
                <div className="delvoura-filter-chips">
                  {section.items.map((item) => (
                    <button key={item} type="button" className="delvoura-filter-chip">
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchFilterBar;
