import { useEffect, useState } from "react";
import { Tabs } from "antd";
import Header from "../../Layout/Header/Index";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import OtpVerification from "./OtpVerification";
import ResetForgetPassword from "./ResetForgetPassword";
import AppFooter from "../../Layout/AppFooter";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useAppSelector } from "../../Store/Hooks";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";

const Authencation = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const [tab, setTab] = useState("login");
  const [authView, setAuthView] = useState<"tabs" | "forgot">("tabs");
  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "reset">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const isLoggedIn = isAuthenticated;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HERO, { replace: true });
    }
  }, [isLoggedIn, navigate]);


  //hide offerbar
  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 70) return setHideOfferBar(true);
        return setHideOfferBar(false);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  const openForgotPassword = () => {
    setAuthView("forgot");
    setForgotStep("email");
    setForgotEmail("");
    setForgotOtp("");
  };
  const backToLogin = () => {
    setAuthView("tabs");
    setTab("login");
  };

  return (
    <div className="delvoura-auth-page min-h-screen text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999 ">
          <Header />
      </div>
      {!hideOfferBar && <OfferBar className="top-20" />}

      <div className="h-[55vh] w-full bg-center bg-cover" style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png')", // add banner image
        }}
      />
      <div className="delvoura-container py-10">
        <div className="delvoura-auth-content mx-auto max-w-xl rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 md:p-8" style={{ boxShadow: "0 20px 60px -40px color-mix(in srgb, var(--color-primary) 35%, transparent)", }} >
          {authView === "tabs" ? (
            <Tabs activeKey={tab} onChange={(key) => setTab(key)} centered
              items={[
                {
                  key: "login",
                  label: <span className="tab-label">Login</span>,
                  children: <SignInForm onForgotPassword={openForgotPassword} />,
                },
                {
                  key: "signup",
                  label: <span className="tab-label">Create Account</span>,
                  children: <SignUpForm onSignupSuccess={() => setTab("login")} />,
                },
              ]}
            />
          ) : (
            <>
              {forgotStep === "email" && (
                <ForgetPasswordForm onSuccess={(email) => { setForgotEmail(email); setForgotStep("otp"); }} onBackToLogin={backToLogin} />
              )}
              {forgotStep === "otp" && (
                <OtpVerification email={forgotEmail} onSuccess={(otp) => { setForgotOtp(otp); setForgotStep("reset"); }} onBack={() => { setForgotStep("email"); }} />
              )}
              {forgotStep === "reset" && (
                <ResetForgetPassword email={forgotEmail} otp={forgotOtp} onSuccess={backToLogin} onBack={() => { setForgotStep("otp"); }} />
              )}
            </>
          )}
        </div>
      </div>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default Authencation;
