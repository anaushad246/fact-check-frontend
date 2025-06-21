// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",  // This will call your backend
  withCredentials: true,
});

export default api;
