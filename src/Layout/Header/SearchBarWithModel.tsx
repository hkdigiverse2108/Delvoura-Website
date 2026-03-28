import { useEffect, useMemo, useState } from "react";
import { Button, Card, ConfigProvider, Flex, Input, Modal, Rate, Tag, Typography, Spin } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Queries } from "../../Api";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import { useDebounce } from "../../Utils/Hooks";
import { setProducts } from "../../Store/Slices/ProductSlice";
import { setScents } from "../../Store/Slices/ScentSlice";
import { setSeasons } from "../../Store/Slices/SeasonSlice";
import type { ProductsQueryParams, ProductItem, ScentItem, SeasonItem, SearchBarWithModalProps } from "../../Types";
import { ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../Components/common";

const { Title, Text } = Typography;

const genderTags = ["women", "men", "unisex"];
const genderTagLabels: Record<string, string> = { women: "Women",men: "Men",unisex: "Unisex",};

type ActiveFilter = | { type: "scent"; id: string; label: string } | { type: "season"; id: string; label: string } | { type: "gender"; value: string } | null;

const SearchBarWithModal = ({ buttonClassName = "", showOnMobile = false, buttonText = "Search perfumes...", }: SearchBarWithModalProps) => {
  
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const visibilityClass = showOnMobile ? "inline-flex" : "hidden md:inline-flex";
  const dispatch = useAppDispatch();

  // get data
  const { data: scentsResponse, isLoading: scentsLoading } = Queries.useGetScents();
  const { data: seasonsResponse, isLoading: seasonsLoading } = Queries.useGetSeasons();

  useEffect(() => {
    const scentItems = scentsResponse?.data?.scent_data ?? [];
    dispatch(setScents(scentItems));
  }, [dispatch, scentsResponse]);

  useEffect(() => {
    const seasonItems = seasonsResponse?.data?.season_data ?? [];
    dispatch(setSeasons(seasonItems));
  }, [dispatch, seasonsResponse]);

  const scentItems = useAppSelector((state) => state.scent.items);
  const seasonItems = useAppSelector((state) => state.season.items);

  const scents = useMemo( () => scentItems.filter((item) => item?.isDeleted !== true && item?.isActive !== false), [scentItems]);
  const seasons = useMemo( () => seasonItems.filter((item) => item?.isDeleted !== true && item?.isActive !== false), [seasonItems]);

  const normalizedSearch = searchValue.trim();
  const hasSearch = normalizedSearch.length > 0;
  const hasKeyword = !!activeFilter;
  const shouldUseTrending = !hasSearch && !hasKeyword;
  const debouncedSearch = useDebounce(normalizedSearch, 400);

  const searchTerm = normalizedSearch.toLowerCase();
  const visibleScents = hasSearch ? scents.filter((item) => (item.name ?? "").toLowerCase().includes(searchTerm)) : scents;
  const visibleSeasons = hasSearch ? seasons.filter((item) => (item.name ?? "").toLowerCase().includes(searchTerm)) : seasons;
  const visibleGenderTags = hasSearch ? genderTags.filter((item) => genderTagLabels[item].toLowerCase().includes(searchTerm)) : genderTags;

  const productParams = useMemo<ProductsQueryParams>(() => {
    const p: ProductsQueryParams = {};
    if (debouncedSearch) p.search = debouncedSearch;
    if (activeFilter?.type === "gender") p.genderFilter = activeFilter.value;
    if (activeFilter?.type === "scent") p.scentFilter = activeFilter.id;
    if (activeFilter?.type === "season") p.seasonFilter = activeFilter.id;
    if (shouldUseTrending) p.TrendingFilter = true;
    return p;
  }, [activeFilter, debouncedSearch, shouldUseTrending]);

  const { data: productsResponse, isLoading: productsLoading, isFetching } = Queries.useGetProducts(productParams);
  const isLoadingProducts = productsLoading || isFetching;

  useEffect(() => {
    dispatch(setProducts({
      products: productsResponse?.data?.product_data ?? [],
      totalData: productsResponse?.data?.totalData ?? 0,
      state: productsResponse?.data?.state ?? null,
    }));
  }, [dispatch, productsResponse]);

  const popularProducts = useAppSelector((state) => state.product.list.items);

  const handleFilterClick = (filter: ActiveFilter) => {
    if (!filter) return;

    setActiveFilter((prev) => {
      const isSame =
        !!prev &&
        prev.type === filter.type &&
        (("id" in prev && "id" in filter && prev.id === filter.id) || ("value" in prev && "value" in filter && prev.value === filter.value));

      if (isSame) {
        return null;
      }
      return filter;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (value.trim()) setActiveFilter(null);
  };

  const isScentActive = (item: ScentItem) => activeFilter?.type === "scent" && activeFilter.id === (item._id ?? "");
  const isSeasonActive = (item: SeasonItem) => activeFilter?.type === "season" && activeFilter.id === (item._id ?? "");
  const isGenderActive = (value: string) => activeFilter?.type === "gender" && activeFilter.value === value;

  const filteredProducts = useMemo(() => {
    const term = normalizedSearch.toLowerCase();
    if (!term) return popularProducts;

    return popularProducts.filter((product) => {
      const nameMatch = (product.name ?? "").toLowerCase().includes(term);
      const genderMatch = (product.gender ?? "").toLowerCase().includes(term);
      const scentMatch = (product.scentIds ?? []).some((s) => (s.name ?? "").toLowerCase().includes(term));
      const seasonMatch = (product.seasonIds ?? []).some((s) => (s.name ?? "").toLowerCase().includes(term));
      return nameMatch || genderMatch || scentMatch || seasonMatch;
    });
  }, [popularProducts, normalizedSearch]);

  const renderFilterTags = (items: any[], type: "scent" | "season", isLoading: boolean, getLabel: (item: any) => string) => {
    if (isLoading) {
      return (
        <Flex wrap gap={10}>
          {[1, 2, 3, 4].map((i) => (
            <Tag key={i} className="delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5" style={{ opacity: 0.6 }}>
              <Spin size="small" />
            </Tag>
          ))}
        </Flex>
      );
    }
    if (items.length === 0) {
      return <Text type="secondary">No {type}s found.</Text>;
    }
    return (
      <Flex wrap gap={10}>
        {items.map((item) => (
          <Tag key={item._id || item.name} className={`delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5 ${(type === "scent" ? isScentActive(item) : isSeasonActive(item)) ? "delvoura-chip-active" : ""}`} onClick={() => { if (!item._id) return; handleFilterClick({ type, id: item._id, label: getLabel(item) });}}>
            {getLabel(item)}
          </Tag>
        ))}
      </Flex>
    );
  };

  const renderProducts = () => {
    if (isLoadingProducts) {
      return (
        <div className="mt-8 flex items-center justify-center min-h-96">
          <Spin size="large" tip="Loading products..." />
        </div>
      );
    }
    if (filteredProducts.length === 0) {
      return (
        <EmptyState className="mt-8 min-h-96 flex items-center justify-center" message="No products found" imageAlt="No products"/>
      );
    }
    return (
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product: ProductItem, index) => {
          const cover = product.coverimage || product.images?.[0] || "";
          const ratingValue = Number(product.ratingSummary?.avgRating || 0);
          const firstVariant = product.variants?.[0] as any;
          const priceValue = typeof firstVariant === "object" ? firstVariant?.price ?? 0 : product.price ?? product.mrp ?? 0;
          const genderValue = (product.gender ?? "").toString().trim().toLowerCase();
          const genderBadge = genderValue === "men"  ? "MEN"  : genderValue === "women"  ? "WOMEN"  : genderValue === "unisex" ? "UNISEX" : genderValue ? genderValue.toUpperCase() : "";
          
          return (
            <Card key={product._id || `${product.name}-${index}`} hoverable styles={{ body: { padding: 10 } }} className="delvoura-product-card delvoura-modal-product-card" style={{ borderRadius: 16 }} onClick={() => navigate(ROUTES.getProductDetails(product._id || ""))}>
              <div className="delvoura-modal-product-media">
                {genderBadge ? <span className="delvoura-modal-product-badge">{genderBadge}</span> : null}
                {cover ? (
                  <img src={cover} alt={product.name || "Product"} className="delvoura-modal-product-media-img" style={{ objectFit: "cover" }} loading="lazy" />
                ) : (
                  <div className="delvoura-modal-product-media-img" style={{ background: "var(--color-bg-soft)" }} />
                )}
              </div>
              <Title level={5} style={{ marginTop: 12, marginBottom: 4 }}>{product.name || "Untitled"}</Title>
              <div className="delvoura-modal-product-rating">
                <Rate disabled value={ratingValue} />
                <Text type="secondary">{ratingValue.toFixed(1)}</Text>
              </div>
              <div style={{ marginTop: 6 }}>
                <Text style={{ color: "var(--color-accent)", fontWeight: 600 }}>Rs. {priceValue}</Text>
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "var(--color-accent)", borderRadiusLG: 20 } }}>
      <Button onClick={() => setOpen(true)} icon={<SearchOutlined />} className={`delvoura-search-btn delvoura-header-pill ${visibilityClass} items-center text-base ${buttonClassName}`} style={{ color: "var(--color-text-muted)" }}>
        {buttonText}
      </Button>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null} closable={false} centered width="95vw" rootClassName="delvoura-search-modal delvoura-light-surface" style={{ maxWidth: 1400 }} styles={{ body: { padding: 0, height: "80vh", width: "100%", overflow: "auto", background: "transparent" }, mask: { backdropFilter: "blur(6px)", background: "color-mix(in srgb, var(--color-primary) 45%, transparent)" }}}>
        <div className="delvoura-modal-surface">
          <Flex align="center" gap={12}>
            <Input autoFocus size="large" placeholder="Search perfumes, fragrances, and scent notes...." value={searchValue} onChange={(event) => handleSearchChange(event.target.value)} prefix={<SearchOutlined style={{ color: "var(--color-accent)" }} />} style={{ borderRadius: 16, height: 54, background: "var(--color-surface-darker)" }} className="delvoura-input" />
            <Button shape="circle" icon={<CloseOutlined />} onClick={() => setOpen(false)} className="delvoura-glow-pill" />
          </Flex>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="delvoura-modal-left space-y-6 rounded-3xl p-5">
              <div>
                <Title level={5}>Popular Scents</Title>
                {renderFilterTags(visibleScents, "scent", scentsLoading, (item) => item.name)}
              </div>

              <div>
                <Title level={5}>Shop by Gender</Title>
                <Flex wrap gap={10}>
                  {visibleGenderTags.length === 0 ? (
                    <Text type="secondary">No genders found.</Text>
                  ) : (
                    visibleGenderTags.map((item) => (
                      <Tag key={item} className={`delvoura-chip delvoura-chip-lg delvoura-chip-strong cursor-pointer rounded-full px-4 py-1.5 ${isGenderActive(item) ? "delvoura-chip-active" : ""}`} onClick={() => handleFilterClick({ type: "gender", value: item })}>
                        {genderTagLabels[item]}
                      </Tag>
                    ))
                  )}
                </Flex>
              </div>

              <div>
                <Title level={5}>Seasonal Picks</Title>
                {renderFilterTags(visibleSeasons, "season", seasonsLoading, (item) => item.name)}
              </div>
            </div>

            <div className="delvoura-modal-right rounded-3xl p-6">
              <Title level={5}>Popular Products</Title>
              {renderProducts()}
            </div>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default SearchBarWithModal;
