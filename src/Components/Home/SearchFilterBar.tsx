import { useEffect, useMemo, useRef, useState } from "react";
import { Button, ConfigProvider, Select } from "antd";
import { CloseOutlined, DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Queries } from "../../Api";
import SearchBarWithModal from "../../Layout/Header/SearchBarWithModel";
import type { HomeFilters } from "../../Types";

const sortOptions = [
  { value: "new", label: "New Arrivals" },
  { value: "best", label: "Best Seller" },
  { value: "price-desc", label: "Price descending" },
  { value: "price-asc", label: "Price ascending" },
  { value: "created-asc", label: "Created ascending" },
  { value: "relevance", label: "Relevance" },
  { value: "title-asc", label: "Title ascending" },
  { value: "title-desc", label: "Title descending" },
];

const genderOptions = [
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "unisex", label: "Unisex" },
];
const genderLabelMap = Object.fromEntries(genderOptions.map((item) => [item.value, item.label])) as Record<string, string>;

type SearchFilterBarProps = {
  filters: HomeFilters;
  onChange: (next: HomeFilters) => void;
};

const SearchFilterBar = ({ filters, onChange }: SearchFilterBarProps) => {
  const sortValue = filters.sort ?? "new";
  const [showFilters, setShowFilters] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const popupFixProps: any = { placement: "bottomLeft", popupAlign: { points: ["tl", "bl"], overflow: { adjustY: false, adjustX: false } } };

  const { data: scentsData } = Queries.useGetScents();
  const { data: seasonsData } = Queries.useGetSeasons();

  const scents = useMemo(() => (scentsData?.data?.scent_data ?? []).filter((item) => item?.isDeleted !== true && item?.isActive !== false), [scentsData]);
  const seasons = useMemo(() => (seasonsData?.data?.season_data ?? []).filter((item) => item?.isDeleted !== true && item?.isActive !== false), [seasonsData]);

  const applyFilters = (next: HomeFilters) => {
    const cleaned: HomeFilters = { ...next };
    if (!cleaned.scent) delete cleaned.scent;
    if (!cleaned.season) delete cleaned.season;
    if (!cleaned.gender) delete cleaned.gender;
    if (!cleaned.collectionFilter) delete cleaned.collectionFilter;
    if (!cleaned.sort) delete cleaned.sort;
    if (!cleaned.sortByFilter) delete cleaned.sortByFilter;
    if (typeof cleaned.TrendingFilter === "undefined") delete cleaned.TrendingFilter;
    onChange(cleaned);
  };

  const toggleFilter = (field: "scent" | "season" | "gender", value: string) => {
    const selected = filters[field] === value ? undefined : value;
    const next = { ...filters, [field]: selected };
    if (!selected) delete next[field];
    applyFilters(next);
  };

  const removeFilter = (field: "scent" | "season" | "gender") => {
    const next = { ...filters };
    delete next[field];
    applyFilters(next);
  };

  const clearAllFilters = () => {
    applyFilters({ sort: "new" });
  };

  const activeFilterItems = useMemo(() => {
    const items: Array<{ key: string; label: string; field: "scent" | "season" | "gender" }> = [];
    if (filters.scent) {
      const name = scents.find((s) => s._id === filters.scent)?.name || "Scent";
      items.push({ key: `scent-${filters.scent}`, label: name, field: "scent" });
    }
    if (filters.season) {
      const name = seasons.find((s) => s._id === filters.season)?.name || "Season";
      items.push({ key: `season-${filters.season}`, label: name, field: "season" });
    }
    if (filters.gender) {
      items.push({ key: `gender-${filters.gender}`, label: genderLabelMap[filters.gender] || filters.gender, field: "gender" });
    }
    return items;
  }, [filters, scents, seasons]);

  useEffect(() => {
    if (!showFilters) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const el = event.target as HTMLElement | null;
      if (el?.closest(".delvoura-sort-dropdown") || el?.closest(".ant-select-dropdown")) return;
      if (barRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      if (filterBtnRef.current?.contains(target)) return;
      setShowFilters(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showFilters]);

  return (
    <section className={`delvoura-home-filter-strip w-full ${showFilters ? "is-open" : ""}`}>
      <div className="delvoura-container">
        <div className="delvoura-home-filter-bar w-full" ref={barRef}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full flex-1 md:max-w-[620px]">
                <SearchBarWithModal showOnMobile buttonText="Search" buttonClassName="delvoura-home-search-btn w-full" />
              </div>
              <Button type="default" icon={showFilters ? <CloseOutlined /> : <FilterOutlined />} className="delvoura-filter-btn" ref={filterBtnRef} onClick={() => setShowFilters((prev) => !prev)}>
                Filter
              </Button>
            </div>

            <div className="lg:ml-auto">
              <ConfigProvider theme={{ token: { colorPrimary: "#EB4A2E", colorBorder: "#353535", colorText: "#FFFFFF", colorTextPlaceholder: "#999999", colorBgContainer: "#353535", colorBgElevated: "#1E1E1E" } }}>
                <Select value={sortValue} onChange={(value) => { const base = { ...filters, sort: value, TrendingFilter: undefined, sortByFilter: undefined }; if (value === "best") applyFilters({ ...base, TrendingFilter: true }); else if (value === "new") applyFilters({ ...base, sortByFilter: "newest" }); else if (value === "price-desc") applyFilters({ ...base, sortByFilter: "priceDESC" }); else if (value === "price-asc") applyFilters({ ...base, sortByFilter: "priceASC" }); else if (value === "created-asc") applyFilters({ ...base, sortByFilter: "oldest" }); else if (value === "title-asc") applyFilters({ ...base, sortByFilter: "nameASC" }); else if (value === "title-desc") applyFilters({ ...base, sortByFilter: "nameDESC" }); else applyFilters(base); }} options={sortOptions} size="large" suffixIcon={<DownOutlined style={{ color: "#FFFFFF" }} />} className="delvoura-sort-select" popupClassName="delvoura-sort-dropdown" getPopupContainer={() => barRef.current ?? document.body} {...popupFixProps} />
              </ConfigProvider>
            </div>
          </div>
        </div>


        {showFilters && (
          <div ref={panelRef} className="delvoura-filter-panel w-full">

            <div className="delvoura-filter-row">
              <div className="delvoura-filter-title">Scents</div>
              <div className="delvoura-filter-chips">
                {scents.length === 0 ? (
                  <span className="text-sm text-[color:var(--color-text-muted)] text-gray-400">No scents available</span>
                ) : (
                  scents.map((scent) => (
                    <button key={scent._id || scent.name} type="button" className={`delvoura-filter-chip ${filters.scent === scent._id ? "is-active" : ""}`} onClick={() => scent._id && toggleFilter("scent", scent._id)}>
                      {scent.name}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="delvoura-filter-row">
              <div className="delvoura-filter-title">Seasons</div>
              <div className="delvoura-filter-chips">
                {seasons.length === 0 ? (
                  <span className="text-sm text-[color:var(--color-text-muted)]  text-gray-400">No seasons available</span>
                ) : (
                  seasons.map((season) => (
                    <button key={season._id || season.name} type="button" className={`delvoura-filter-chip ${filters.season === season._id ? "is-active" : ""}`} onClick={() => season._id && toggleFilter("season", season._id)}>
                      {season.name}
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="delvoura-filter-row">
              <div className="delvoura-filter-title">Gender</div>
              <div className="delvoura-filter-chips">
                {genderOptions.map((gender) => (
                  <button key={gender.value} type="button" className={`delvoura-filter-chip ${filters.gender === gender.value ? "is-active" : ""}`} onClick={() => toggleFilter("gender", gender.value)}>
                    {gender.label}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterItems.length > 0 && (
              <div className="delvoura-filter-row mt-5">
                <div className="delvoura-filter-title">Refine By</div>
                <div className="delvoura-filter-chips">
                  {activeFilterItems.map((item) => (
                    <button key={item.key} type="button" className="delvoura-filter-chip delvoura-filter-chip-active flex items-center gap-1" onClick={() => removeFilter(item.field)}>
                      {item.label} <CloseOutlined style={{ fontSize: 10 }} />
                    </button>
                  ))}
                  <button type="button" className="delvoura-filter-clear-all" onClick={clearAllFilters}>Clear All</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchFilterBar;
