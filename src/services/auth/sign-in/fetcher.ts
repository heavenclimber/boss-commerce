import fetcher from "@/lib/fetcher";
import { ISignInRequestType, ISignInResponseType } from "./types";

import config from "./config";

const signInUser = async (
  params: ISignInRequestType
): Promise<ISignInResponseType> => {
  try {
    const data: ISignInResponseType = await fetcher({
      method: "post",
      url: config.endpoint,
      data: params,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const rawMessage = e?.response?.data;
    const errorMessage =
      typeof rawMessage === "string" ? rawMessage : "Something went wrong";
    throw new Error(errorMessage || "Sign-in failed");
  }
};

export default signInUser;
