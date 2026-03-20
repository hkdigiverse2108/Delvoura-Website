import Hero from "../Pages/Hero/Index";
import MainHomePage from "../Pages/Home/Index";
import Authencation from "../Pages/Auth";
import ResetForgetPassword from "../Pages/Auth/ResetForgetPassword";
import OtpVerification from "../Pages/Auth/OtpVerification";
import { ROUTES } from "../Constants";
import ProductDescription from "../Pages/Description/Index";

export const PageRoutes = [
  { path: ROUTES.HERO, element: <Hero /> },
  { path: ROUTES.COLLECTIONS_ALL, element: <MainHomePage /> },
  { path: ROUTES.PRODUCT_DETAILS, element: <ProductDescription /> },
];

export const AuthRoutes = [
  { path: ROUTES.AUTH.AUTHETICATION, element: <Authencation /> },
  { path: ROUTES.AUTH.RESET_FORGET_PASSWORD, element: <ResetForgetPassword /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <OtpVerification /> },
];
