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

export { Validation };
