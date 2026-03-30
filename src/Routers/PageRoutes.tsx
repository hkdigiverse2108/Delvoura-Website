import Hero from "../Pages/Hero/Index";
import MainHomePage from "../Pages/Home/Index";
import Authencation from "../Pages/Auth";
import { ROUTES } from "../Constants";
import ProductDescription from "../Pages/Description/Index";
import Contact from "../Pages/Contact/Index";
import Shipping from "../Pages/Shipping/Index";
import ReturnsAndExchanges from "../Pages/Returns and Exchanges/Index";
import PrivacyPolicy from "../Pages/Privacy Policy/Index";
import TermsAndConditions from "../Pages/Terms and Conditions/Index";
import RefundPolicy from "../Pages/Refund Policy/Index";
import TermsOfService from "../Pages/Terms of Service/Index";
import ProfilePage from "../Pages/Profile/Index";
import BlogPage from "../Pages/Blog/Index";
import BlogDetailsPage from "../Pages/Blog/Details";
import CheckoutPage from "../Pages/Checkout/Index";
import PaymentSuccessPage from "../Pages/Payment/Success";
import PaymentFailedPage from "../Pages/Payment/Failed";

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
  { path: ROUTES.PROFILE, element: <ProfilePage /> },
  { path: ROUTES.BLOG, element: <BlogPage /> },
  { path: ROUTES.BLOG_DETAILS, element: <BlogDetailsPage /> },
  { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
  { path: ROUTES.PAYMENT.SUCCESS, element: <PaymentSuccessPage /> },
  { path: ROUTES.PAYMENT.FAILED, element: <PaymentFailedPage /> },
];

export const AuthRoutes = [
  { path: ROUTES.AUTH.AUTHETICATION, element: <Authencation /> },
];
