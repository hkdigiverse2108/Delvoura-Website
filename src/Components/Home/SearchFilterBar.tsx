import { useEffect, useMemo, useRef, useState } from "react";
import { Button, ConfigProvider, Select } from "antd";
import { CloseOutlined, DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Queries } from "../../Api";
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

const genderOptions = ["women", "men", "unisex"];

const SearchFilterBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sortValue, setSortValue] = useState("new");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{ scent?: string; season?: string; gender?: string }>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);

  const { data: scentsData } = Queries.useGetScents();
  const { data: seasonsData } = Queries.useGetSeasons();

  const scents = useMemo(() => (scentsData?.data?.scent_data ?? []).filter((item) => item?.isDeleted !== true && item?.isActive !== false), [scentsData]);
  const seasons = useMemo(() => (seasonsData?.data?.season_data ?? []).filter((item) => item?.isDeleted !== true && item?.isActive !== false), [seasonsData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveFilters({
      scent: params.get("scent") || undefined,
      season: params.get("season") || undefined,
      gender: params.get("gender") || undefined,
    });
    setSortValue(params.get("sort") || "new");
  }, [location.search]);

  const syncFiltersToUrl = (newFilters: { scent?: string; season?: string; gender?: string; sort?: string }) => {
    const params = new URLSearchParams(location.search);

    if (newFilters.scent !== undefined) {
      if (newFilters.scent) params.set("scent", newFilters.scent);
      else params.delete("scent");
    }
    if (newFilters.season !== undefined) {
      if (newFilters.season) params.set("season", newFilters.season);
      else params.delete("season");
    }
    if (newFilters.gender !== undefined) {
      if (newFilters.gender) params.set("gender", newFilters.gender);
      else params.delete("gender");
    }
    if (newFilters.sort !== undefined) {
      if (newFilters.sort) params.set("sort", newFilters.sort);
      else params.delete("sort");
    }
    const query = params.toString();
    navigate(`${location.pathname}${query ? `?${query}` : ""}`, { replace: true });
  };

  const toggleFilter = (field: "scent" | "season" | "gender", value: string) => {
    setActiveFilters((prev) => {
      const selected = prev[field] === value ? undefined : value;
      const next = { ...prev, [field]: selected };
      if (!selected) delete next[field];
      syncFiltersToUrl({ ...next, sort: sortValue });
      return next;
    });
  };

  const removeFilter = (field: "scent" | "season" | "gender") => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      delete next[field];
      syncFiltersToUrl({ ...next, sort: sortValue });
      return next;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSortValue("new");
    navigate(location.pathname, { replace: true });
  };

  const activeFilterItems = useMemo(() => {
    const items: Array<{ key: string; label: string; field: "scent" | "season" | "gender" }> = [];
    if (activeFilters.scent) {
      const name = scents.find((s) => s._id === activeFilters.scent)?.name || "Scent";
      items.push({ key: `scent-${activeFilters.scent}`, label: name, field: "scent" });
    }
    if (activeFilters.season) {
      const name = seasons.find((s) => s._id === activeFilters.season)?.name || "Season";
      items.push({ key: `season-${activeFilters.season}`, label: name, field: "season" });
    }
    if (activeFilters.gender) {
      items.push({ key: `gender-${activeFilters.gender}`, label: activeFilters.gender, field: "gender" });
    }
    return items;
  }, [activeFilters, scents, seasons]);

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
      <div className="delvoura-container">
        <div className="delvoura-home-filter-bar w-full">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex w-full flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="w-full flex-1 md:max-w-[620px]">
                <SearchBarWithModal showOnMobile buttonText="Search" buttonClassName="delvoura-home-search-btn w-full"/>
              </div>
              <Button type="default" icon={showFilters ? <CloseOutlined /> : <FilterOutlined />} className="delvoura-filter-btn" ref={filterBtnRef} onClick={() => setShowFilters((prev) => !prev)}>
                Filter
              </Button>
            </div>

            <div className="lg:ml-auto">
              <ConfigProvider theme={{token: {colorPrimary: "#EB4A2E",colorBorder: "#353535",colorText: "#FFFFFF",colorTextPlaceholder: "#999999",colorBgContainer: "#353535",colorBgElevated: "#1E1E1E",},}}>
                <Select value={sortValue} onChange={(value) => { setSortValue(value); syncFiltersToUrl({ ...activeFilters, sort: value }); }} options={sortOptions} size="large" suffixIcon={<DownOutlined />} className="delvoura-sort-select" popupClassName="delvoura-sort-dropdown" getPopupContainer={() => document.body} />
              </ConfigProvider>
            </div>
          </div>
        </div>


        {showFilters && (
          <div ref={panelRef} className="delvoura-filter-panel mt-5 w-full">

            <div className="delvoura-filter-row">
              <div className="delvoura-filter-title">Scents</div>
              <div className="delvoura-filter-chips">
                {scents.length === 0 ? (
                  <span className="text-sm text-[color:var(--color-text-muted)]">No scents available</span>
                ) : (
                  scents.map((scent) => (
                    <button
                      key={scent._id || scent.name}
                      type="button"
                      className={`delvoura-filter-chip ${activeFilters.scent === scent._id ? "is-active" : ""}`}
                      onClick={() => scent._id && toggleFilter("scent", scent._id)}
                    >
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
                  <span className="text-sm text-[color:var(--color-text-muted)]">No seasons available</span>
                ) : (
                  seasons.map((season) => (
                    <button
                      key={season._id || season.name}
                      type="button"
                      className={`delvoura-filter-chip ${activeFilters.season === season._id ? "is-active" : ""}`}
                      onClick={() => season._id && toggleFilter("season", season._id)}
                    >
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
                  <button
                    key={gender}
                    type="button"
                    className={`delvoura-filter-chip ${activeFilters.gender === gender ? "is-active" : ""}`}
                    onClick={() => toggleFilter("gender", gender)}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {activeFilterItems.length > 0 && (
              <div className="delvoura-filter-row mt-5">
                <div className="delvoura-filter-title">Refine By</div>
                <div className="delvoura-filter-chips">
                  {activeFilterItems.map((item) => (
                    <button key={item.key} type="button" className="delvoura-filter-chip delvoura-filter-chip-active flex items-center gap-1" onClick={() => removeFilter(item.field)} >
                      {item.label}
                      <CloseOutlined style={{ fontSize: 10 }} />
                    </button>
                  ))}
                  <button type="button" className="delvoura-filter-clear-all" onClick={clearAllFilters}>
                    Clear All
                  </button>
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
