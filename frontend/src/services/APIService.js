import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  tls: {
    rejectUnauthorized: false,
  },
});

export default instance;
