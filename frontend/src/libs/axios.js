import axios from "axios";
//in production we don't have localhost hence we need to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api/" : "/api/"
const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // redirect user to login
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;