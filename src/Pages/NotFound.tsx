import { Button, Result, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/Hooks";

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const isProfileGate = location.pathname === ROUTES.PROFILE && !isAuthenticated;

  return (
    <section className="relative h-screen overflow-hidden bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 25%, transparent), transparent 60%)", }} />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full blur-3xl" style={{ background:"radial-gradient(circle, color-mix(in srgb, var(--color-primary) 25%, transparent), transparent 60%)", }} />

      <div className="delvoura-container flex h-full flex-col items-center justify-center">
        <div className="w-full rounded-[32px] border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8 backdrop-blur md:p-12" style={{ background:  "color-mix(in srgb, var(--color-card) 90%, transparent)", boxShadow:"0 30px 80px -40px color-mix(in srgb, var(--color-primary) 20%, transparent)", }} >
          <Result status="404" title={
              <Title  level={1}  className="!mb-0 text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-[0.08em]" >
                {isProfileGate ? "Login Required" : "Page Not Found"}
              </Title>
            }
            subTitle={
              <div className="mx-auto max-w-2xl">
                {isProfileGate ? (
                  <Text className="block text-base text-[color:var(--color-text-muted)] md:text-lg">
                    You are not logged in. Please sign in to access your profile and account settings.
                  </Text>
                ) : (
                  <>
                    <Text className="block text-base text-[color:var(--color-text-muted)] md:text-lg">
                      The page you are trying to reach does not exist or was moved.
                    </Text>
                    <Text className="block text-base text-[color:var(--color-text-muted)] md:text-lg">
                      Let’s get you back to Delvoura’s main store.
                    </Text>
                  </>
                )}
              </div>
            }
            extra={
              <div className="flex flex-wrap items-center justify-center gap-4">
                {isProfileGate ? (
                  <>
                    <Button type="primary" size="large" className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]" onClick={() => navigate(ROUTES.AUTH.AUTHETICATION)} style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-soft-accent))", border: "none", boxShadow:"0 16px 40px -20px color-mix(in srgb, var(--color-accent) 80%, transparent)",  }} >
                      GO LOGIN
                    </Button>
                    <Button size="large" className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]" onClick={() => navigate("/")}   >
                      GO BACK HOME
                    </Button>
                  </>
                ) : (
                  <>
                    <Button  type="primary"  size="large"  className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]"  onClick={() => navigate("/")}  style={{ background:  "linear-gradient(135deg, var(--color-accent), var(--color-soft-accent))", border: "none", boxShadow: "0 16px 40px -20px color-mix(in srgb, var(--color-accent) 80%, transparent)", }} >
                      GO TO HOME
                    </Button>
                    <Button size="large" className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]" onClick={() => navigate(-1)} >
                      GO BACK
                    </Button>
                  </>
                )}
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
