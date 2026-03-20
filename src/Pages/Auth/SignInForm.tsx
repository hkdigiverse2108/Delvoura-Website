import { Button, Typography } from "antd";
import { Form, Formik, type FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { Mutations } from "../../Api";
import { ROUTES } from "../../Constants";
import { setSignin } from "../../Store/Slices/AuthSlice";
import { useAppDispatch } from "../../Store/Hooks";
import type { LoginPayload } from "../../Types";
import { SigninSchema } from "../../Utils/ValidationSchemas";
import { CommonEmailInput, CommonPasswordInput, notifyError, notifySuccess } from "../../Attribute";

const { Text } = Typography;

const SignInForm = () => {
  const { mutate: Signin, isPending: isSigninPending } = Mutations.useSignin();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    Signin(
      { ...values, email: values.email.toLowerCase() },
      {
        onSuccess: (response) => {
          if (response?.data?.token) {
            dispatch(setSignin(response.data));
            navigate(ROUTES.HERO);
          }
          notifySuccess("Signed in successfully");
        },
        onError: (err) => {
          const message = err instanceof Error ? err.message : "Something went wrong";
          notifyError(message);
        },
        onSettled: () => {
          resetForm();
        },
      },
    );
  };

  return (
    <Formik<LoginPayload> initialValues={{ email: "", password: "" }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur }) => {
        const emailError = touched.email && typeof errors.email === "string" ? errors.email : undefined;
        const passwordError = touched.password && typeof errors.password === "string" ? errors.password : undefined;

        return (
          <Form className="space-y-8 [&_.ant-form-item]:mb-0">
            <CommonEmailInput name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={emailError} touched={!!touched.email} /> 
            <CommonPasswordInput name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={passwordError} touched={!!touched.password} />

            <div className="mb-2 flex items-center justify-between text-xs text-[color:var(--color-text-muted)]">
              <Text>Remember me</Text>
              <button className="font-semibold text-[color:var(--color-accent)]">Forgot password?</button>
            </div>

            <Button type="primary" size="large" loading={isSigninPending} htmlType="submit" className="w-full rounded-full tracking-[0.22em] text-[color:var(--color-text-on-dark)]" style={{ background: "var(--color-primary)", borderColor: "transparent" }}>
              Login
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
