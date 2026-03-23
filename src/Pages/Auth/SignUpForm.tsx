import { Button } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { Mutations } from "../../Api";
import { CommonEmailInput, CommonPasswordInput, CommonTextInput, notifyError, notifySuccess } from "../../Attribute";
import type { SignupPayload } from "../../Types";
import { SignupSchema } from "../../Utils/ValidationSchemas";

type SignUpFormProps = {
  onSignupSuccess?: () => void;
};

const SignUpForm = ({ onSignupSuccess }: SignUpFormProps) => {
  const { mutate: Signup, isPending: isSignupPending } = Mutations.useSignup();

  type SignupFormValues = Omit<SignupPayload, "loginSource">;

  const handleSubmit = async (values: SignupFormValues, { resetForm }: FormikHelpers<SignupFormValues>) => {
    Signup( { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: () => {
          notifySuccess("Account created successfully");
          resetForm();
          onSignupSuccess?.();
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          notifyError(message);
        },
      },
    );
  };

  return (
    <Formik<SignupFormValues> initialValues={{ firstName: "", lastName: "", email: "", password: "" }} validationSchema={SignupSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const firstNameError = touched.firstName && typeof errors.firstName === "string" ? errors.firstName : undefined;
        const lastNameError = touched.lastName && typeof errors.lastName === "string" ? errors.lastName : undefined;
        const emailError = touched.email && typeof errors.email === "string" ? errors.email : undefined;
        const passwordError = touched.password && typeof errors.password === "string" ? errors.password : undefined;
        return (
          <Form className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <CommonTextInput name="firstName" label="First Name" placeholder="First name" value={values.firstName} onChange={handleChange} onBlur={handleBlur} error={firstNameError} touched={!!touched.firstName} />
              <CommonTextInput name="lastName" label="Last Name" placeholder="Last name" value={values.lastName} onChange={handleChange} onBlur={handleBlur} error={lastNameError} touched={!!touched.lastName} />
            </div>
            <div className="grid gap-4 mb-3">
            <CommonEmailInput name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={emailError} touched={!!touched.email} />
            <CommonPasswordInput name="password" placeholder="Create password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={passwordError} touched={!!touched.password} />
            </div>

            <Button type="primary" size="large" loading={isSignupPending} htmlType="submit" className="w-full rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-accent)", borderColor: "transparent" }}>
              Create Account
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignUpForm;
