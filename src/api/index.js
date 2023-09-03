import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://store-app-t08k.onrender.com/api",
});

export default axiosInstance;
