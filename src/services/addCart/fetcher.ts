import fetcher from "@/lib/fetcher";
import config from "./config";
import { CartFormValues } from "@/schemas/addCart";

const addCart = async (params: CartFormValues): Promise<CartFormValues> => {
  try {
    const data: CartFormValues = await fetcher({
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
    throw new Error(errorMessage || "Add cart failed");
  }
};

export default addCart;
