import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

let instance: AxiosInstance;

export function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  if (!instance) {
    instance = axios.create({
      baseURL: "/",
      timeout: 10000,
    });
    
  }
  // @ts-ignore
  return instance(config);
}
