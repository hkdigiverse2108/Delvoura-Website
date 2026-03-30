import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Queries } from "../../Api";
import { ROUTES } from "../../Constants";
import type { CollectionMenuProps } from "../../Types";

const staticSections = [
  {
    title: null,
    items: [{ label: "Shop All Perfumes", value: "all" }],
  },
  {
    title: "Shop By Gender",
    items: [
      { label: "Women", value: "women" },
      { label: "Men", value: "men" },
      { label: "Unisex", value: "unisex" },
    ],
  },
];

const CollectionMenu = ({ isMobile = false, onNavigate }: CollectionMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = Queries.useGetCollections();
  const collections = (data?.data?.collection_data || []).filter( (item) => item && item.isDeleted !== true && item.isActive !== false);

  const getImageSrc = (item: { image?: string; imageUrl?: string }) => item.image || item.imageUrl || "";
  const getStaticImage = (value: string) => {
    if (value === "all") return "/assets/images/collection/shopAllPerfume.png";
    if (value === "women") return "/assets/images/collection/women.png";
    if (value === "men") return "/assets/images/collection/mens.png";
    if (value === "unisex") return "/assets/images/collection/unisex.png";
    return "";
  };
  
  const goToCollections = (filters: any) => {
    setOpen(false);
    onNavigate?.();
    sessionStorage.setItem("dv_collection_filters", JSON.stringify(filters));
    window.dispatchEvent(new CustomEvent("dv:collection-filters", { detail: filters }));
    navigate(ROUTES.COLLECTIONS_ALL, { state: { filters, _nav: Date.now() } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const activeFilters = (location.state as any)?.filters || {};
  const activeGender = activeFilters.gender;
  const activeCollection = activeFilters.collectionFilter;
  const isShopAllActive = !activeGender && !activeCollection;

  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <button onClick={() => setOpen(!open)} className="flex items-center justify-between rounded-xl bg-[var(--color-card)] px-4 py-3 text-sm font-semibold" style={{ color: "var(--color-text)", border: "1px solid var(--color-border)" }}>
          <span>Collections</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>

        <div className={`delvoura-mobile-dropdown flex flex-col gap-5 pb-4 ${open ? "is-open" : ""}`} aria-hidden={!open}>
            {staticSections.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <h3 className="mb-2 text-xs text-[color:var(--color-text-muted)]">
                    {section.title}
                  </h3>
                )}

                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <button key={item.value} className={`flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] px-3 py-3 ${item.value === "all" && isShopAllActive ? "is-active" : ""} ${item.value === activeGender ? "is-active" : ""}`} onClick={() => { if (item.value === "all") goToCollections({ sort: "new" }); if (item.value === "women") goToCollections({ sort: "new", gender: "women" }); if (item.value === "men") goToCollections({ sort: "new", gender: "men" }); if (item.value === "unisex") goToCollections({ sort: "new", gender: "unisex" }); }}>
                      {getStaticImage(item.value) ? (
                        <img src={getStaticImage(item.value)} alt={item.label} className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-soft-accent)]"/>
                      )}
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h3 className="mb-2 text-xs text-[color:var(--color-text-muted)]">
                Collections
              </h3>

              <div className="delvoura-collection-scroll collection-scroll flex flex-col gap-3 pb-3">
                {isLoading && (
                  <span className="text-sm text-[color:var(--color-text-muted)]">
                    Loading collections...
                  </span>
                )}

                {!isLoading && collections.length === 0 && (
                  <span className="text-sm text-[color:var(--color-text-muted)]">
                    No collections found.
                  </span>
                )}

                {!isLoading &&
                  collections.map((item) => {
                    const imageSrc = getImageSrc(item);
                    return (
                      <button key={item._id || item.name} className={`flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-soft)] px-3 py-3 ${activeCollection && activeCollection === item._id ? "is-active" : ""}`} onClick={() => goToCollections({ sort: "new", collectionFilter: item._id })}>
                        {imageSrc ? (
                          <img src={imageSrc} alt={item.name || "Collection"} className="h-10 w-10 rounded-lg object-cover" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-soft-accent)]" />
                        )}
                        <span className="text-sm">{item.name || "Untitled"}</span>
                      </button>
                    );
                  })}
              </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative inline-block">
      {/* BUTTON */}
      <button onClick={() => setOpen(!open)} className="delvoura-header-pill delvoura-collection-btn inline-flex items-center gap-2 text-sm font-semibold" style={{ background: "transparent", color: "var(--color-text)" }}>
        Collections
        <span className="text-xs">▾</span>
      </button>

      {/* DROPDOWN */}
      <div className={`delvoura-collection-panel delvoura-light-surface absolute top-full left-0 mt-3 w-80 max-w-[92vw] rounded-3xl p-5 shadow-2xl ${ open ? "delvoura-collection-panel-open" : "delvoura-collection-panel-closed" }`} aria-hidden={!open}>
        <div className="delvoura-collection-panel-scroll collection-scroll flex flex-col pb-3">
          {staticSections.map((section, i) => (
            <div key={i} className="mb-4">
              {section.title && (
                <h3 className="mb-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark)]">
                  {section.title}
                </h3>
              )}

              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <button key={item.value} className={`delvoura-collection-item flex items-center gap-3 rounded-2xl px-3 py-3 text-left ${item.value === "all" && isShopAllActive ? "is-active" : ""} ${item.value === activeGender ? "is-active" : ""}`} onClick={() => { if (item.value === "all") goToCollections({ sort: "new" }); if (item.value === "women") goToCollections({ sort: "new", gender: "women" }); if (item.value === "men") goToCollections({ sort: "new", gender: "men" }); if (item.value === "unisex") goToCollections({ sort: "new", gender: "unisex" }); }}>
                    {getStaticImage(item.value) ? (
                      <img src={getStaticImage(item.value)} alt={item.label} className="h-9 w-9 rounded-xl object-cover" />
                    ) : (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-soft-accent)]"/>
                    )}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mb-2 text-xs uppercase tracking-[0.25em] text-[color:var(--color-text-on-dark)]">
            Collections
          </div>
          <div className="flex flex-col gap-2">
            {isLoading && (
              <span className="text-sm text-[color:var(--color-text-muted)]">
                Loading collections...
              </span>
            )}

            {!isLoading && collections.length === 0 && (
              <span className="text-sm text-[color:var(--color-text-muted)]">
                No collections found.
              </span>
            )}

            {!isLoading &&
              collections.map((item) => {
                const imageSrc = getImageSrc(item);
                return (
                  <button key={item._id || item.name} className={`delvoura-collection-item flex items-center gap-3 rounded-2xl px-3 py-3 text-left ${activeCollection && activeCollection === item._id ? "is-active" : ""}`} onClick={() => goToCollections({ sort: "new", collectionFilter: item._id })}>
                    {imageSrc ? (
                      <img src={imageSrc} alt={item.name || "Collection"} className="h-9 w-9 rounded-xl object-cover" />
                    ) : (
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-soft-accent)]" />
                    )}
                    <span className="text-sm font-medium">{item.name || "Untitled"}</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionMenu;
