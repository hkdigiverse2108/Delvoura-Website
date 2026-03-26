import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/Hooks";
import NotFound from "../Pages/NotFound";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (location.pathname === ROUTES.PROFILE && !isAuthenticated) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
