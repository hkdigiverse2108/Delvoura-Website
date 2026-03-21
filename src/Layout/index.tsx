import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";

const Layout = () => {
  const navigation = useNavigation();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const isBusy = navigation.state === "loading" || navigation.state === "submitting";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (isBusy) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      setVisible(true);
      return;
    }

    if (visible) {
      hideTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        hideTimerRef.current = null;
      }, 1200);
    }
  }, [isBusy, visible]);

  return (
    <div>
      {/* <Header /> */}
      <GlobalLoader visible={visible} />
      <Outlet />
    </div>
  );
};

export default Layout;
