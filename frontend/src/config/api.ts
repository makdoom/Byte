import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.makshaikh99.workers.dev/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
