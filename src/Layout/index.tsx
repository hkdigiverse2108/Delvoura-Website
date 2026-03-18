import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import GlobalLoader from "./GlobalLoader";

const Layout = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const isBusy = navigation.state === "loading" || navigation.state === "submitting";

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
