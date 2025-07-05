import * as yup from "yup";

export interface ISignInForm {
  username: string;
  password: string;
}

export const signInSchema = yup.object({
  username: yup
    .string()
    .min(8, "Username must be at least 8 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
