import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
});

export default api;
