import fetcher from "@/lib/fetcher";
import { IUserObj } from "./types";

import config from "./config";

const getUserList = async (): Promise<IUserObj[]> => {
  try {
    const data: IUserObj[] = await fetcher({
      method: "get",
      url: config.endpoint,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const rawMessage = e?.response?.data;
    const errorMessage =
      typeof rawMessage === "string" ? rawMessage : "Something went wrong";
    throw new Error(errorMessage || "Get user data failed");
  }
};

export default getUserList;
