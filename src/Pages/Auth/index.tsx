import { useEffect, useState } from "react";
import { Tabs } from "antd";
import Header from "../../Layout/Header/Index";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import AppFooter from "../../Layout/AppFooter";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useAppSelector } from "../../Store/Hooks";
import { InstagramScrollingSection, OfferBar } from "../../Components/common";

const Authencation = () => {
  const [hideOfferBar, setHideOfferBar] = useState(false);
  const [tab, setTab] = useState("login");
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
        <div
          className="delvoura-auth-content mx-auto max-w-xl rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-6 md:p-8"
          style={{
            boxShadow:
              "0 20px 60px -40px color-mix(in srgb, var(--color-primary) 35%, transparent)",
          }}
        >
          <Tabs activeKey={tab} onChange={(key) => setTab(key)} centered
            items={[
              {
                key: "login",
                label: <span className="tab-label">Login</span>,
                children: <SignInForm />,
              },
              {
                key: "signup",
                label: <span className="tab-label">Create Account</span>,
                children: <SignUpForm onSignupSuccess={() => setTab("login")} />,
              },
            ]}
          />
        </div>
      </div>
      <InstagramScrollingSection />
      <AppFooter />
    </div>
  );
};

export default Authencation;
