import { ConfigProvider } from "antd";
import Cart from "./Cart";
import CollectionMenu from "./CollectionMenu";
import LoginAndSignupBtns from "./LoginAndSignupBtns";
import SearchBarWithModel from "./SearchBarWithModel";
import MobileSidebar from "../Sidebar/Index";
import { Queries } from "../../Api";
import { useAppSelector } from "../../Store/Hooks";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";


const Header = () => {
  const [hideAuth, setHideAuth] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: userData } = Queries.useGetSingleUser((user as { _id?: string } | null)?._id);
  const isLoggedIn = isAuthenticated || !!userData;

  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 80) return setHideAuth(true);
      else return setHideAuth(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "var(--color-accent)", colorBorder: "var(--color-border)", colorText: "var(--color-text)",}, }}>
      <header className="delvoura-header-theme delvoura-header-shell  sticky top-0 z-50 border-b border-[var(--color-border)]" style={{ background: "var(--color-card)" }}>
        <div className="mx-auto w-[90%] max-w-6xl px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-3">
            <div className="flex items-center gap-3">
              <div className="md:hidden">
                <MobileSidebar />
              </div>

              <div className="hidden md:flex">
                <CollectionMenu />
              </div>
            </div>

            <div className="hidden items-center justify-center md:flex">
              <img src="/assets/images/logo/logo-white.png" alt="Delvoura" className="h-8 w-auto"/>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-3 md:hidden ">
                <SearchBarWithModel />
                <Cart />
              </div>

              {/* DESKTOP */}
              <div className="hidden md:flex items-center gap-4">
                <SearchBarWithModel />
                {!isLoggedIn 
                ? ( !hideAuth ? <LoginAndSignupBtns /> : null) 
                : ( <ProfileCard user={user} userData={userData} /> )}
                <Cart />
              </div>
            </div>
          </div>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
