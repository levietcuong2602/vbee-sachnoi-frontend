import axios from "axios";
import { getToken } from "@/utils/auth";
import $store from "~/store";

console.log({ authent: $store.getters });

// Create axios instance
const service = axios.create({
  baseURL: process.env.baseUrl,
  timeout: 120000, // Request timeout
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + getToken(); // Set JWT token
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    if (error.message === "timeout of 10000ms exceeded") {
      error.message =
        "Mất kết nối đường truyền, vui lòng thử lại sau 30 giây...";
    } else if (error.message === "Request failed with status code 500") {
      error.message = "Lỗi thao tác dữ liệu, vui lòng thử lại sau 30 giây...";
    } else if (error.message === "Request failed with status code 403") {
      error.message = "Bạn không có quyền thực hiện thao tác này !";
    } else if (error.message === "Request failed with status code 404") {
      error.message = "Đường dẫn không tồn tại !";
    }

    return Promise.reject(error);
  }
);

export default service;
