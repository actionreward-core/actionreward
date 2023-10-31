import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:8000'
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('game-access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    void Promise.reject(error);
  }
);