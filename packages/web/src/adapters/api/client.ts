import axios, { type AxiosResponse } from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: "application/json" },
});

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
  get: (url: string) => client.get(url).then(responseBody),
  post: (url: string, body: {}) => client.post(url, body).then(responseBody),
  put: (url: string, body: {}) => client.put(url, body).then(responseBody),
  delete: (url: string) => client.delete(url).then(responseBody),
};
