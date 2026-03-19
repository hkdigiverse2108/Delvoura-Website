import { useState, useRef, useEffect } from "react";
import type { CollectionMenuProps } from "../../Types";

const menuData = [
  {
    title: null,
    items: [{ label: "Shop All Perfumes", tone: "rose" }],
  },
  {
    title: "Shop By Gender",
    items: [
      { label: "Women's", tone: "peach" },
      { label: "Men's", tone: "charcoal" },
      { label: "Unisex", tone: "slate" },
    ],
  },
  {
    title: "Collections",
    items: [
      { label: "Perfume Spray", tone: "ruby" },
      { label: "Private Blends", tone: "ink" },
      { label: "Perfume Roll-Ons", tone: "sand" },
    ],
  },
];

const toneClass = {
  rose: "from-[#3b0f1b] via-[#5a1f2d] to-[#a2475a]",
  peach: "from-[#3c1e16] via-[#6a2f23] to-[#b2644e]",
  charcoal: "from-[#17151a] via-[#2a2831] to-[#4b4756]",
  slate: "from-[#3a4452] via-[#566274] to-[#8894a8]",
  ruby: "from-[#4b1423] via-[#7a2238] to-[#c14760]",
  ink: "from-[#0e0f16] via-[#1a1d28] to-[#323949]",
  sand: "from-[#3b2e24] via-[#6a5342] to-[#b08a6b]",
};



const CollectionMenu = ({ isMobile = false }: CollectionMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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

        {open && (
          <div className="flex flex-col gap-5">
            {menuData.map((section, i) => (
              <div key={i}>
                {section.title && (
                  <h3 className="mb-2 text-xs text-gray-400"> {section.title}</h3>
                )}

                <div className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <button key={item.label} className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-3">
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${toneClass[item.tone as keyof typeof toneClass]}`}/>
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
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
      <div className={`delvoura-collection-panel absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-3xl p-5 shadow-2xl ${ open ? "delvoura-collection-panel-open" : "delvoura-collection-panel-closed" }`} aria-hidden={!open}>
        {menuData.map((section, i) => (
          <div key={i} className="mb-4">
            {section.title && (
              <h3 className="mb-2 text-xs uppercase tracking-[0.25em] text-white">{section.title}</h3>
            )}

              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <button key={item.label} className="delvoura-collection-item flex items-center gap-3 rounded-2xl px-3 py-3 text-left">
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${ toneClass[item.tone as keyof typeof toneClass]}`}/>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CollectionMenu;
