import { Button, Form } from "antd";
import { CommonEmailInput, CommonPasswordInput, CommonTextInput,} from "../../Attribute";

const SignUpForm = () => {
  return (
    <Form layout="vertical">
      <div className="grid gap-4 md:grid-cols-2">
        <CommonTextInput name="firstName" label="First Name" placeholder="First name"/>
        <CommonTextInput name="lastName" label="Last Name" placeholder="Last name"/>
      </div>

      <CommonEmailInput name="email" />
      <CommonPasswordInput name="password" placeholder="Create password" />
      <Button type="primary" size="large" className="w-full rounded-full tracking-[0.22em] text-white" style={{ background: "var(--color-primary)", borderColor: "transparent" }}>
        Create Account
      </Button>
    </Form>
  );
};

export default SignUpForm;
