import Hero from "../Pages/Hero/Index";
import Authencation from "../Pages/Auth";
import ResetForgetPassword from "../Pages/Auth/ResetForgetPassword";
import OtpVerification from "../Pages/Auth/OtpVerification";
import { ROUTES } from "../Constants";

export const PageRoutes = [{ path: ROUTES.HERO, element: <Hero /> }];

export const AuthRoutes = [
  { path: ROUTES.AUTH.AUTHETICATION, element: <Authencation /> },
  { path: ROUTES.AUTH.RESET_FORGET_PASSWORD, element: <ResetForgetPassword /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <OtpVerification /> },
];
