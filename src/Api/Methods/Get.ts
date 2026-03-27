import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import { HTTP_STATUS } from "../../Constants"
import { handleUnauthorized } from "./handleUnauthorized"

type Params = Record<string, string | number | boolean | null | undefined>

export async function Get<T>( url: string, params?: Params, headers?: Record<string, string>, token?: string): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...headers,
    },
    params,
  }

  try {
    const response = await axios.get<T>(BASE_URL + url, config)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; status?: number }>
    const message = axiosError.response?.data?.message || axiosError.message || "Something went wrong"

    handleUnauthorized(axiosError.response?.status)

    throw new Error(message)
  }
}
