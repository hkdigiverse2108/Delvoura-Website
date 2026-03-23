import { Button, Typography } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations } from "../../Api";
import { CommonPasswordInput, notifyError, notifySuccess } from "../../Attribute";
import type { ResetForgetPasswordPayload } from "../../Types";
import { ResetForgetPasswordSchema } from "../../Utils/ValidationSchemas";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants";

const { Text } = Typography;

type ResetForgetPasswordProps = {
  email?: string;
  otp?: string;
  onSuccess?: () => void;
  onBack?: () => void;
};

type ResetValues = Omit<ResetForgetPasswordPayload, "email" | "otp"> & { confirmPassword: string };

const ResetForgetPassword = ({ email, otp, onSuccess, onBack }: ResetForgetPasswordProps) => {
  const navigate = useNavigate();
  const { mutate: ResetPassword, isPending } = Mutations.useResetForgetPassword();

  const handleSubmit = async (values: ResetValues, { resetForm }: FormikHelpers<ResetValues>) => {
    if (!email || !otp) return;
    ResetPassword(
      { email: email.toLowerCase(), otp, password: values.password },
      {
        onSuccess: () => {
          notifySuccess("Password reset successfully");
          onSuccess?.();
          resetForm();
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          notifyError(message);
        },
      },
    );
  };

  return (
    <>
      {!email || !otp ? (
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Create New Password</h2>
          <Text className="text-xs text-[color:var(--color-text-muted)]">OTP or email missing. Please start from Forgot Password.</Text>
          <Button type="primary" size="large" className="rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }} onClick={() => navigate(ROUTES.AUTH.AUTHETICATION)}>
            Go to Login
          </Button>
        </div>
      ) : (
        <Formik<ResetValues> initialValues={{ password: "", confirmPassword: "" }} validationSchema={ResetForgetPasswordSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const passwordError = touched.password && typeof errors.password === "string" ? errors.password : undefined;
        const confirmPasswordError = touched.confirmPassword && typeof errors.confirmPassword === "string" ? errors.confirmPassword : undefined;
        return (
          <Form className="space-y-8 [&_.ant-form-item]:mb-0">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Create New Password</h2>
              <Text className="text-xs text-[color:var(--color-text-muted)]">Choose a strong password for your account.</Text>
            </div>
            <CommonPasswordInput name="password" label="New Password" placeholder="New password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={passwordError} touched={!!touched.password} />
            <CommonPasswordInput name="confirmPassword" label="Confirm Password" placeholder="Confirm password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={confirmPasswordError} touched={!!touched.confirmPassword} />
            <Button type="primary" size="large" loading={isPending} htmlType="submit" className="w-full rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }}>
              Reset Password
            </Button> <br /> <br />
            <Button type="default" size="large" onClick={onBack} className="w-full rounded-full border-[color:var(--color-border)] text-[color:var(--color-text)] hover:!border-[color:var(--color-accent)] hover:!text-[color:var(--color-accent)]">
              Back to OTP
            </Button>
          </Form>
        );
      }}
        </Formik>
      )}
    </>
  );
};

export default ResetForgetPassword;
