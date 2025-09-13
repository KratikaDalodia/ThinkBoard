import axios from "axios";
//in production we don't have localhost hence we need to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL: BASE_URL
});

export default api;