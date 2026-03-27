import { Button, Typography } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { CommonOtpInput } from "../../Attribute";
import type { VerifyOtpPayload } from "../../Types";
import { VerifyOtpSchema } from "../../Utils/ValidationSchemas";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";

const { Text } = Typography;

type OtpVerificationProps = {
  email?: string;
  onSuccess?: (otp: string) => void;
  onBack?: () => void;
};

type OtpValues = Omit<VerifyOtpPayload, "email">;

const OtpVerification = ({ email, onSuccess, onBack }: OtpVerificationProps) => {
  const navigate = useNavigate();

  if (!email) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Verify OTP</h2>
        <Text className="text-xs text-[color:var(--color-text-muted)]">Email missing. Please start from Forgot Password.</Text>
        <Button type="primary" size="large" className="rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }} onClick={() => navigate(ROUTES.AUTH.AUTHETICATION)}>
          Go to Login
        </Button>
      </div>
    );
  }
  const handleSubmit = async (values: OtpValues, { resetForm }: FormikHelpers<OtpValues>) => {
    onSuccess?.(values.otp);
    resetForm();
  };

  return (
    <Formik<OtpValues> initialValues={{ otp: "" }} validationSchema={VerifyOtpSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        const otpError = touched.otp && typeof errors.otp === "string" ? errors.otp : undefined;
        return (
          <Form className="space-y-8 [&_.ant-form-item]:mb-0">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Verify OTP</h2>
              <Text className="text-xs text-[color:var(--color-text-muted)]">We sent a code to {email}.</Text>
            </div>
            <CommonOtpInput name="otp" value={values.otp} onChange={(val: string) => setFieldValue("otp", val)} onBlur={() => setFieldTouched("otp", true)} error={otpError} touched={!!touched.otp} />
            <Button type="primary" size="large" htmlType="submit" className="w-full rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }}>
              Verify OTP
            </Button> <br /> <br />
            <Button type="default" size="large" onClick={onBack} className="w-full rounded-full border-[color:var(--color-border)] text-[color:var(--color-text)] hover:!border-[color:var(--color-accent)] hover:!text-[color:var(--color-accent)]">
              Back to email
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtpVerification;
