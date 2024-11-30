import axios from "axios";

// Lấy URL API từ môi trường hoặc giá trị mặc định
const BASE_URL = process.env.CMS_API_URL || "http://localhost:3000";

// Cấu hình mặc định chung
const defaultConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Tạo instance chính
export const axiosInstance = axios.create({
  ...defaultConfig,
  headers: {
    ...defaultConfig.headers,
    "Cache-Control": "no-store",
    Accept: "application/json, text/plain, /",
    "Access-Control-Allow-Origin": "*",
  },
});

// Thêm interceptor cho axiosInstance
axiosInstance.interceptors.response.use(
  (response) => response.data, // Trả về data của response
  (error) => Promise.reject(error) // Quản lý lỗi
);

// Tạo instance khác nếu cần, có thể bỏ qua `Cache-Control`
export const axiosClient = axios.create({
  ...defaultConfig,
});

// Xuất URL CMS_ENV nếu cần
export const CMS_ENV = BASE_URL;
