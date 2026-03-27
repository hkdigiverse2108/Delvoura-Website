import { HTTP_STATUS } from "../../Constants";
import Store from "../../Store/Store";
import { setSessionExpired } from "../../Store/Slices/AuthSlice";

export const handleUnauthorized = (status?: number) => {
  if (status !== HTTP_STATUS.UNAUTHORIZED) return;

  const { auth } = Store.getState();
  if (!auth?.isAuthenticated) return;

  Store.dispatch(setSessionExpired());
};
