import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import signInUser from "@/services/auth/sign-in/fetcher";
import { useDispatch } from "react-redux";
import { setUsername } from "@/store/userSlice";
import { ISignInRequestType } from "@/services/auth/sign-in/types";
import { notification } from "@/contexts/SnackbarContext";
import getUserList from "@/services/getUsers/fetcher";

export function useSignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (data: ISignInRequestType) => {
    setIsLoading(true);

    try {
      const res = await signInUser(data);
      if (data.username && res.token) {
        const users = await getUserList();
        const user = users?.find((e) => {
          return e.username === data.username;
        });
        if (user) {
          setCookie("token", res.token);
          dispatch(setUsername(user));
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/"); // Redirect to home or dashboard
          notification({
            type: "success",
            text: "Sign-in Success!",
          });
        } else {
          notification({
            type: "error",
            text: "Sign-in Failed",
          });
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      notification({
        type: "error",
        text: err?.message || "Sign-in Failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
}
