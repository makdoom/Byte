/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { z, ZodError } from "zod";

axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV == "dev"
      ? import.meta.env.VITE_DEV_BASE_URL
      : import.meta.env.VITE_PROD_BASE_URL,
  //  "http://localhost:8787/api/v1", //"https://backend.makshaikh99.workers.dev/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { VITE_NODE_ENV, VITE_DEV_BASE_URL, VITE_PROD_BASE_URL } =
          import.meta.env;
        const response = await axios.post(
          `${
            VITE_NODE_ENV == "dev" ? VITE_DEV_BASE_URL : VITE_PROD_BASE_URL
          }/auth/token`
          //"http://localhost:8787/api/v1/auth/token" //"https://backend.makshaikh99.workers.dev/api/v1/auth/token"
        );
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        return axiosInstance(originalRequest);
      } catch (e) {
        console.error("Refresh token invalid", e);
        // Optionally handle token refresh failure (e.g., redirect to login)
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// Generic get request with zod validation
export const getRequest = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  config?: AxiosRequestConfig
): Promise<T> => {
  let response: AxiosResponse<unknown>;
  try {
    response = await axiosInstance.get(url, config);

    return schema.parse(response.data);
  } catch (error) {
    if (response.data.statusCode === 400) {
      throw new Error(response.data.message);
    }

    if (error instanceof ZodError) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

// Generic post request with zod validation
export const postRequest = async <T, D>(
  url: string,
  data: T,
  dataSchema: z.ZodSchema<T>,
  responseSchema: z.ZodSchema<D>,
  config?: AxiosRequestConfig
): Promise<D> => {
  let response: AxiosResponse<unknown>;
  try {
    dataSchema.parse(data); // Validate request payload
    response = await axiosInstance.post(url, data, config);
    return responseSchema.parse(response.data); // Validate response data
  } catch (error: unknown) {
    if (response.data.statusCode === 400) {
      throw new Error(response.data.message);
    }
    if (error instanceof ZodError) {
      throw new Error("Validation error");
    } else {
      throw error;
    }
  }
};

export default axiosInstance;
