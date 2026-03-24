import * as Yup from "yup";
import { Validation } from "./Validation";

export const SigninSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
});

export const SignupSchema = Yup.object({
  firstName: Validation("string", "First name"),
  lastName: Validation("string", "Last name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
});

export const ForgetPasswordSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export const VerifyOtpSchema = Yup.object({
  otp: Validation("string", "OTP", { extraRules: (s) => s.matches(/^\d{4}$/, "OTP must be 4 digits") }),
});

export const ResetForgetPasswordSchema = Yup.object({
  password: Validation("string", "Password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
  confirmPassword: Validation("string", "Confirm password", {
    extraRules: (s) => s.oneOf([Yup.ref("password")], "Passwords do not match"),
  }),
});

export const ProductReviewSchema = Yup.object({
  starRating: Validation("number", "Rating", { min: 1, max: 5 }),
  description: Validation("string", "Review", { required: false, max: 1000 }),
  firstName: Validation("string", "First name"),
  lastName: Validation("string", "Last name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export { Validation };
