import axios from "axios";

const API_URL = "https://6011c41391905e0017be57cf.mockapi.io/sp5/api/v1";

const API = axios.create({
  baseURL: `${API_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use((error) => Promise.reject(error));

export default API;
