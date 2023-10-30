import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string || 'http://localhost:3000/api'
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const projectId = localStorage.getItem('ar-current-project-id');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (projectId) {
      config.headers['X-Project-Id'] = JSON.parse(projectId);
    }
    return config;
  },
  (error) => {
    void Promise.reject(error);
  }
);