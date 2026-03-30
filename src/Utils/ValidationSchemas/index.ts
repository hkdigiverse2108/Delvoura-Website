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

export const ChangePasswordSchema = Yup.object({
  currentPassword: Validation("string", "Current password"),
  newPassword: Validation("string", "New password", {
    extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  }),
  confirmPassword: Validation("string", "Confirm password", {
    extraRules: (s) => s.oneOf([Yup.ref("newPassword")], "Passwords do not match"),
  }),
});

export const ProductReviewSchema = Yup.object({
  starRating: Validation("number", "Rating", { min: 1, max: 5 }),
  description: Validation("string", "Review", { required: false, max: 1000 }),
  firstName: Validation("string", "First name"),
  lastName: Validation("string", "Last name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export const ContactUsSchema = Yup.object({
  fullName: Validation("string", "Full name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  countryCode: Validation("string", "Country code", { required: false, max: 6 }),
  phone: Validation("string", "Phone", {
    required: false,
    extraRules: (s) =>
      s
        .matches(/^\d*$/, "Phone must contain only digits")
        .min(10, "Phone must be at least 10 digits")
        .max(10, "Phone must be at least 10 digits")

  }),
});

export const NewsletterSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export const ProfileInfoSchema = Yup.object({
  firstName: Validation("string", "First name"),
  lastName: Validation("string", "Last name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  countryCode: Validation("string", "Country code", { required: false, max: 6 }),
  phone: Validation("string", "Phone", {
    required: false,
    extraRules: (s) =>
      s
        .matches(/^\d*$/, "Phone must contain only digits")
        .min(10, "Phone must be at least 10 digits")
        .max(10, "Phone must be at least 10 digits")
  }),
});

export const AddressSchema = Yup.object({
  country: Validation("string", "Country"),
  address1: Validation("string", "Address line 1"),
  address2: Validation("string", "Landmark", { required: false }),
  city: Validation("string", "City"),
  state: Validation("string", "State"),
  pinCode: Validation("string", "Pin code", {
    extraRules: (s) => s.matches(/^\d{6}$/, "Pin code must be 6 digits"),
  }),
  isDefault: Validation("mixed", "Default", { required: false }),
  isActive: Validation("mixed", "Active", { required: false }),
});

export const CheckoutSchema = Yup.object({
  firstName: Validation("string", "First name"),
  lastName: Validation("string", "Last name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  countryCode: Validation("string", "Country code", { required: false, max: 6 }),
  phone: Validation("string", "Phone", {
    extraRules: (s) =>
      s
        .matches(/^\d*$/, "Phone must contain only digits")
        .min(10, "Phone must be at least 10 digits")
        .max(15, "Phone must be at most 15 digits"),
  }),
  country: Validation("string", "Country"),
  state: Validation("string", "State"),
  city: Validation("string", "City"),
  pinCode: Validation("string", "Pin code", {
    extraRules: (s) => s.matches(/^\d{6}$/, "Pin code must be 6 digits"),
  }),
  address1: Validation("string", "Address line 1"),
  address2: Validation("string", "Landmark", { required: false }),
  discountCode: Validation("string", "Discount code", { required: false }),
});

export { Validation };
