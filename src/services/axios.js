import axios from "axios";
import NProgress from "nprogress";

const API_URL = "https://6011c41391905e0017be57cf.mockapi.io/sp5/api/v1";

const API = axios.create({
  baseURL: `${API_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

NProgress.configure({ easing: "ease", speed: 500 });

API.interceptors.request.use((config) => {
  console.log("----config", config);
  NProgress.start();
  return config;
});

API.interceptors.response.use((response) => {
  NProgress.done();
  console.log("----response", response);
  return response;
});

export default API;
