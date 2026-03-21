import Hero from "../Pages/Hero/Index";
import MainHomePage from "../Pages/Home/Index";
import Authencation from "../Pages/Auth";
import ResetForgetPassword from "../Pages/Auth/ResetForgetPassword";
import OtpVerification from "../Pages/Auth/OtpVerification";
import { ROUTES } from "../Constants";
import ProductDescription from "../Pages/Description/Index";
import Contact from "../Pages/Contact/Index";
import Shipping from "../Pages/Shipping/Index";
import ReturnsAndExchanges from "../Pages/Returns and Exchanges/Index";
import PrivacyPolicy from "../Pages/Privacy Policy/Index";
import TermsAndConditions from "../Pages/Terms and Conditions/Index";
import RefundPolicy from "../Pages/Refund Policy/Index";
import TermsOfService from "../Pages/Terms of Service/Index";

export const PageRoutes = [
  { path: ROUTES.HERO, element: <Hero /> },
  { path: ROUTES.COLLECTIONS_ALL, element: <MainHomePage /> },
  { path: ROUTES.PRODUCT_DETAILS, element: <ProductDescription /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.SHIPPING, element: <Shipping /> },
  { path: ROUTES.RETURNS_EXCHANGES, element: <ReturnsAndExchanges /> },
  { path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: ROUTES.TERMS_CONDITIONS, element: <TermsAndConditions /> },
  { path: ROUTES.REFUND_POLICY, element: <RefundPolicy /> },
  { path: ROUTES.TERMS_OF_SERVICE, element: <TermsOfService /> },
];

export const AuthRoutes = [
  { path: ROUTES.AUTH.AUTHETICATION, element: <Authencation /> },
  { path: ROUTES.AUTH.RESET_FORGET_PASSWORD, element: <ResetForgetPassword /> },
  { path: ROUTES.AUTH.VERIFY_OTP, element: <OtpVerification /> },
];
