import { Button, Form, Typography } from "antd";
import { CommonEmailInput, CommonPasswordInput } from "../../Attribute";

const { Text } = Typography;

const SignInForm = () => {
  return (
    <Form layout="vertical">
      <CommonEmailInput name="email" />
      <CommonPasswordInput name="password" />

      <div className="mb-6 flex items-center justify-between text-xs text-[color:var(--color-text-muted)]">
        <Text>Remember me</Text>
        <button className="font-semibold text-[color:var(--color-accent)]">
          Forgot password?
        </button>
      </div>

      <Button type="primary" size="large" className="w-full rounded-full tracking-[0.22em] text-white" style={{ background: "var(--color-primary)", borderColor: "transparent" }} >
        Login
      </Button>
    </Form>
  );
};

export default SignInForm;
