import fetcher from "@/lib/fetcher";
import { ICartObj } from "./types";

import config from "./config";

const getCartList = async (): Promise<ICartObj[]> => {
  try {
    const data: ICartObj[] = await fetcher({
      method: "get",
      url: config.endpoint,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const rawMessage = e?.response?.data;
    const errorMessage =
      typeof rawMessage === "string" ? rawMessage : "Something went wrong";
    throw new Error(errorMessage || "Get cart list failed");
  }
};

export default getCartList;
