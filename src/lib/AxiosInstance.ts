import axios, { AxiosInstance } from "axios";
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});
