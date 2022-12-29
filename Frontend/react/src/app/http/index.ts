import Axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

export const httpClient: AxiosInstance = Axios.create({
  baseURL: process.env.BASEURL,
  withCredentials: false,
});

httpClient.interceptors.request.use(async function (config) {
  const session: any = await getSession();
  if (session?.accessToken) {
    config.headers!.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});
