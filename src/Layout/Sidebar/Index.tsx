import { Drawer, Button } from "antd";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CollectionMenu from "../Header/CollectionMenu";
import ProfileCard from "../Header/ProfileCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/Routes";
import { useAppSelector } from "../../Store/Hooks";
import { Queries } from "../../Api";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: userData } = Queries.useGetSingleUser( (user as { _id?: string } | null)?._id);
  const isLoggedIn = isAuthenticated || !!userData;

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
      <Button icon={<MenuOutlined />} onClick={() => {if (!isDesktop) setOpen(true) }}type="text"aria-label="Open menu"className="md:hidden text-xl text-[color:var(--color-text)]"/>

      {/* DRAWER */}
      {!isDesktop && (
        <Drawer placement="left" open={open} onClose={() => setOpen(false)} width={300} headerStyle={{ display: "none" }} bodyStyle={{ padding: "20px", background: "var(--color-card)",}} rootClassName="delvoura-light-surface delvoura-sidebar-drawer">
          <div className="flex h-full flex-col justify-between">
            
            {/* TOP */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <img src="/assets/images/logo/logo-black.png" alt="Delvoura" className="h-6 w-auto"/>
                <Button type="text" onClick={() => setOpen(false)}><CloseOutlined /></Button>
              </div>

              <div>
                <h3 className="mb-2 text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">Collections</h3>
                <div className="rounded-xl bg-[color:var(--color-bg)] p-3">
                  <CollectionMenu isMobile />
                </div>
              </div>

              {isLoggedIn && (
                <div>
                  <h3 className="mb-2 text-xs uppercase tracking-wider text-[color:var(--color-text-muted)]">Profile</h3>
                  <div className="rounded-xl bg-[color:var(--color-bg)] p-3">
                    <ProfileCard variant="mobile" />
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM */}
            {!isLoggedIn && (
              <div className="mt-6 flex flex-col gap-3">
                <button className="rounded-full border border-[var(--color-border)] py-3" onClick={() => { setOpen(false); navigate(ROUTES.AUTH.AUTHETICATION);}}>
                  Login
                </button>

                <button className="rounded-full bg-[color:var(--color-primary)] py-3 text-[color:var(--color-text-on-dark)]" onClick={() => { setOpen(false); navigate(ROUTES.AUTH.AUTHETICATION);}}>
                  <span className="text-[color:var(--color-text-on-dark)]">Sign up</span>
                </button>
              </div>
            )}
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MobileSidebar;
