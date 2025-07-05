/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./axios";

type Method = "get" | "post" | "put" | "delete" | "patch";

type FetcherOptions = {
  method?: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
};

const fetcher = async <T>(options: FetcherOptions): Promise<T> => {
  const { method = "get", url, data, params, headers } = options;

  const response = await axiosInstance.request<T>({
    method,
    url,
    data,
    params,
    headers,
  });

  return response.data;
};

export default fetcher;
