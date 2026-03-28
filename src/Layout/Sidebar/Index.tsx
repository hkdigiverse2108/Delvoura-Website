import { Drawer, Button } from "antd";
import { CloseOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CollectionMenu from "../Header/CollectionMenu";
import ProfileCard from "../Header/ProfileCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/Routes";
import { useAppSelector } from "../../Store/Hooks";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const matches = e.matches;
      setIsDesktop(matches);
      if (matches) setOpen(false);
    };

    handleChange(mql);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <Button icon={<MenuOutlined />} onClick={() => {if (!isDesktop) setOpen(true) }}type="text"aria-label="Open menu"className="md:hidden delvoura-glow-pill delvoura-cart-btn delvoura-mobile-menu-btn relative grid h-11 w-11 place-items-center rounded-2xl transition text-xl"/>

      {/* DRAWER */}
      {!isDesktop && (
        <Drawer placement="left" open={open} onClose={() => setOpen(false)} width={320} headerStyle={{ display: "none" }} bodyStyle={{ padding: "22px", background: "var(--color-card)" }} maskStyle={{ backgroundColor: "color-mix(in srgb, #0a0f1f 70%, transparent)" }} rootClassName="delvoura-light-surface delvoura-sidebar-drawer" >
          <div className="flex h-full flex-col justify-between">
            
            {/* TOP */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <img src="/assets/images/logo/logo-black.png" alt="Delvoura" className="h-6 w-auto"/>
                <Button type="text" onClick={() => setOpen(false)} aria-label="Close menu" className="delvoura-glow-pill delvoura-sidebar-close-btn">
                  <CloseOutlined />
                </Button>
              </div>

              <div className="delvoura-sidebar-section">
                <h3 className="delvoura-sidebar-label mb-2 text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                  <span className="delvoura-sidebar-label-icon">☰</span>
                  Collections
                </h3>
                <div className="delvoura-sidebar-panel rounded-xl bg-[color:var(--color-card)] p-3">
                  <CollectionMenu isMobile onNavigate={() => setOpen(false)} />
                </div>
              </div>

              {isLoggedIn && (
                <div className="delvoura-sidebar-section">
                  <h3 className="delvoura-sidebar-label mb-2 text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">
                    <span className="delvoura-sidebar-label-icon"><UserOutlined /></span>
                    Profile
                  </h3>
                  <div className="delvoura-sidebar-panel rounded-xl bg-[color:var(--color-card)] p-3">
                    <ProfileCard variant="mobile" onNavigate={() => setOpen(false)} />
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM */}
            {!isLoggedIn && (
              <div className="mt-6 flex flex-col gap-3 ">
                <button className="rounded-full border border-[var(--color-border)] py-3" onClick={() => { setOpen(false); navigate(ROUTES.AUTH.AUTHETICATION);}}>
                  Login
                </button>

                <button className="rounded-full bg-[color:var(--color-accent)] py-3 text-[color:var(--color-text-on-dark)]" onClick={() => { setOpen(false); navigate(ROUTES.AUTH.AUTHETICATION);}}>
                  <span className="text-white">Sign up</span>
                </button>
                <br />
              </div>
            )}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MobileSidebar;
