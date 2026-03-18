import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen overflow-hidden bg-[#f6f2ee] text-[#1a141b]">
      <div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,122,69,0.25),_transparent_60%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(18,13,22,0.25),_transparent_60%)] blur-3xl" />

      <div className="mx-auto flex h-full w-[90%] max-w-5xl flex-col items-center justify-center">
        <div className="w-full rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur md:p-12">
          <Result
            status="404"
            title={
              <Title
                level={1}
                className="!mb-0 text-[clamp(2.2rem,4vw,3.5rem)] font-semibold tracking-[0.08em]"
              >
                Page Not Found
              </Title>
            }
            subTitle={
              <div className="mx-auto max-w-2xl">
                <Text className="block text-base text-[#3a2f38] md:text-lg">
                  The page you are trying to reach does not exist or was moved.
                </Text>
                <Text className="block text-base text-[#3a2f38] md:text-lg">
                  Let’s get you back to Delvoura’s main store.
                </Text>
              </div>
            }
            extra={
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  type="primary"
                  size="large"
                  className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]"
                  onClick={() => navigate("/")}
                  style={{
                    background: "linear-gradient(135deg,#ff7a45,#ffb067)",
                    border: "none",
                    boxShadow: "0 16px 40px -20px rgba(255,122,69,0.8)",
                  }}
                >
                  GO TO HOME
                </Button>
                <Button
                  size="large"
                  className="h-12 rounded-full px-8 text-base font-semibold tracking-[0.2em]"
                  onClick={() => navigate(-1)}
                >
                  GO BACK
                </Button>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
