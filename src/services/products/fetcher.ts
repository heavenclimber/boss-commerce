import fetcher from "@/lib/fetcher";
import { IProductObj } from "./types";

import config from "./config";

const getProductDetail = async (id: number): Promise<IProductObj> => {
  try {
    const data: IProductObj = await fetcher({
      method: "get",
      url: `${config.endpoint}/${id}`,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    const rawMessage = e?.response?.data;
    const errorMessage =
      typeof rawMessage === "string" ? rawMessage : "Something went wrong";
    throw new Error(errorMessage || "Get product detail failed");
  }
};

export default getProductDetail;
