import axios, { AxiosError, type AxiosRequestConfig } from "axios"
import { HTTP_STATUS } from "../../Constants"
import { handleUnauthorized } from "./handleUnauthorized"

export async function Delete<TResponse, TInput>( url: string, data?: TInput, token?: string): Promise<TResponse> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: BASE_URL + url,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}),},
    data,
  }

  try {
    const response = await axios(config)
    const resData = response.data

    if (response.status === HTTP_STATUS.OK) {
      return resData
    }

    return null as TResponse
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>
    const message = axiosError.response?.data?.message || axiosError.message || "Something went wrong"
    handleUnauthorized(axiosError.response?.status)
    throw new Error(message)
  }
}
