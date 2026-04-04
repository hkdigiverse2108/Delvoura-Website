import { InstagramScrollingSection, OfferBar } from "../../Components/common";
import BannerSlider from "../../Components/Home/BannerSlider";
import SearchFilterBar from "../../Components/Home/SearchFilterBar";
import ProductGrid from "../../Components/Home/ProductGrid";
import NewsletterModal from "../../Components/ConfirmModel/NewsletterModal";
import Header from "../../Layout/Header/Index";
import AppFooter from "../../Layout/AppFooter";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataGrid } from "../../Utils/Hooks";
import { Queries } from "../../Api";
import Pagination from "../../Components/common/Pagination";

const MainHomePage = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const { filters, setFilters, params, paginationModel, setPaginationModel } = useDataGrid({ defaultFilters: { sort: "new" }, pageSize: 20 });
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = Queries.useGetProducts(params);
  const products = data?.data?.product_data || [];
  const totalData = data?.data?.totalData || 0;
  const totalPages = data?.data?.state?.totalPages;

  useEffect(() => {
    const storageKey = "dv_newsletter_modal_shown";
    const shown = sessionStorage.getItem(storageKey) === "1";
    if (shown) return;

    const timer = window.setTimeout(() => {
      setNewsletterOpen(true);
      sessionStorage.setItem(storageKey, "1");
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length
      ? (navEntries[0] as PerformanceNavigationTiming).type === "reload"
      : false;

    if (!isReload) return;
    setFilters({ sort: "new" });
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    sessionStorage.removeItem("dv_collection_filters");
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, navigate, setFilters, setPaginationModel]);

  useEffect(() => {
    const handleCollectionFilters = (event: Event) => {
      const detail = (event as CustomEvent).detail as any;
      if (!detail) return;
      setFilters(detail);
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    };

    window.addEventListener("dv:collection-filters", handleCollectionFilters);
    return () => window.removeEventListener("dv:collection-filters", handleCollectionFilters);
  }, [setFilters, setPaginationModel]);

  const stateFilters = (location.state as any)?.filters;
  useEffect(() => {
    const stored = sessionStorage.getItem("dv_collection_filters");
    const storedFilters = stored ? JSON.parse(stored) : null;
    const nextFilters = stateFilters || storedFilters;
    if (!nextFilters) return;
    setFilters(nextFilters);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    if (stored) sessionStorage.removeItem("dv_collection_filters");
  }, [stateFilters, setFilters, setPaginationModel]);

   //hide offerbar
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 70) return setHideOfferBar(true);
        return setHideOfferBar(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
  return (
    <>
      <section className="relative w-full bg-[color:var(--color-bg)]">
        <div className="sticky top-0 z-[550] w-full">
          <Header />
        </div>
       {!hideOfferBar && <OfferBar className="top-20" />}
        <BannerSlider />
        <SearchFilterBar filters={filters} onChange={setFilters} />
        <ProductGrid products={products} isLoading={isLoading} />
        <Pagination total={totalData} totalPages={totalPages} pageSize={paginationModel.pageSize} current={paginationModel.page + 1} onChange={(page) => { setPaginationModel((prev) => ({ ...prev, page: page - 1 })); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
        <InstagramScrollingSection />
      </section>
      <AppFooter />
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </>
  );
};

export default MainHomePage;
