import * as yup from "yup";

export interface ISignInForm {
  username: string;
  password: string;
}

export const signInSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
