import { Button, ConfigProvider, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/Routes";

const LoginAndSignupBtns = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "var(--color-accent)", colorBorder: "var(--color-border)",},}}>
      <Flex align="center" gap={0} className="delvoura-auth-wrap rounded-full px-1.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]"style={{ background: "transparent", color: "var(--color-primary)",}}>
        <Button type="text" onClick={() => navigate(ROUTES.AUTH.AUTHETICATION)} className="delvoura-auth-btn rounded-full">
          LOGIN
        </Button>
        <Button type="text" onClick={() => navigate(ROUTES.AUTH.AUTHETICATION)} className="delvoura-auth-btn font-medium delvoura-auth-cta rounded-full">
          SIGN UP
        </Button>
      </Flex>
    </ConfigProvider>
  );
};

export default LoginAndSignupBtns;
