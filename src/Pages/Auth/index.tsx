import { useState } from "react";
import { Tabs } from "antd";
import Header from "../../Layout/Header/Index";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import AppFooter from "../../Layout/AppFooter";
import { InstagramScrollingSection } from "../../Components/common";

const Authencation = () => {
  const [tab, setTab] = useState("login");

  return (
    <div className="delvoura-auth-page min-h-screen bg-[#f5f1f2] text-[color:var(--color-text)]">
      <div className="sticky top-0 z-999">
          <Header />
      </div>

      <div className="h-[55vh] w-full bg-center bg-cover" style={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0175/6875/9862/files/homepage_banner.png')", // add banner image
        }}
      />
      <div className="mx-auto w-[90%] max-w-6xl py-10">
        <div className="delvoura-auth-content mx-auto max-w-xl rounded-3xl border border-[#e9e0e3] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] md:p-8">
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
                children: <SignUpForm />,
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
