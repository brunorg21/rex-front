import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const client = (config?: AxiosRequestConfig) => {
  const api = axios.create({
    baseURL: "http://localhost:3333",
    ...config,
  });

  return {
    async get<T>(uri: string): Promise<AxiosResponse<T>> {
      const response = await api.get<T>(uri);
      return response;
    },
    async post<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await api.post<T>(uri, data);
      return response;
    },
    async put<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await api.put<T>(uri, data);
      return response;
    },
    async patch<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await api.patch<T>(uri, data);
      return response;
    },
    async delete<T>(uri: string, data: unknown): Promise<AxiosResponse<T>> {
      const response = await api.delete<T>(uri, { data });
      return response;
    },
    api,
  };
};
