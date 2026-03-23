import { Button, Typography } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations } from "../../Api";
import { CommonEmailInput, notifyError, notifySuccess } from "../../Attribute";
import type { ForgetPasswordPayload } from "../../Types";
import { ForgetPasswordSchema } from "../../Utils/ValidationSchemas";

const { Text } = Typography;

type ForgetPasswordFormProps = {
  onSuccess?: (email: string) => void;
  onBackToLogin?: () => void;
};

const ForgetPasswordForm = ({ onSuccess, onBackToLogin }: ForgetPasswordFormProps) => {
  const { mutate: ForgetPassword, isPending } = Mutations.useForgetPassword();

  const handleSubmit = async (values: ForgetPasswordPayload, { resetForm }: FormikHelpers<ForgetPasswordPayload>) => {
    ForgetPassword(
      { email: values.email.toLowerCase() },
      {
        onSuccess: () => {
          notifySuccess("OTP sent to your email");
          onSuccess?.(values.email.toLowerCase());
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
    <Formik<ForgetPasswordPayload> initialValues={{ email: "" }} validationSchema={ForgetPasswordSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const emailError = touched.email && typeof errors.email === "string" ? errors.email : undefined;
        return (
          <Form className="space-y-8 [&_.ant-form-item]:mb-0">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Forgot Password</h2>
              <Text className="text-xs text-[color:var(--color-text-muted)]">Enter your email to receive an OTP.</Text>
            </div>
            <CommonEmailInput name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={emailError} touched={!!touched.email} />
            <Button type="primary" size="large" loading={isPending} htmlType="submit" className="w-full rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }}>
              Send OTP
            </Button> <br /> <br />
            <Button type="default" size="large" onClick={onBackToLogin} className="w-full rounded-full  border-[color:var(--color-border)] text-[color:var(--color-text)] hover:!border-[color:var(--color-accent)] hover:!text-[color:var(--color-accent)]">
              Back to login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgetPasswordForm;
