import axios from "axios";
import Config from "../App/service/config";

const axiosInstance = axios.create({
  baseURL: Config.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const acessToken = localStorage.getItem("token");
    if (acessToken) {
      config.headers.Authorization = `Bearer ${acessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
