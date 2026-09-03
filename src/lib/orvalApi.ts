import { api } from "@/lib/api.ts";

import type { AxiosError, AxiosRequestConfig } from "axios";

export const orvalApi = async <ResponseData>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<ResponseData> => {
  const url = config.url?.replace(/^\/api(?=\/|$)/, "") ?? config.url;
  const response = await api.request<ResponseData>({
    ...config,
    ...options,
    url,
  });

  return response.data;
};

export type ErrorType<ErrorData> = AxiosError<ErrorData>;
export type BodyType<BodyData> = BodyData;
