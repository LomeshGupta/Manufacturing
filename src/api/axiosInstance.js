import axios from 'axios';

const TOKEN_KEY = 'erp_token';
const REFRESH_KEY = 'erp_refresh_token';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach bearer token ──
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 / 403 ──
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired → attempt silent refresh (one retry)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_KEY);

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );
          localStorage.setItem(TOKEN_KEY, data.token);
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axiosInstance(originalRequest);
        } catch {
          // Refresh failed — clear session and redirect
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_KEY);
          localStorage.removeItem('erp_user');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('erp_user');
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      window.location.href = '/unauthorized';
    }

    return Promise.reject(
      error.response?.data || { message: error.message || 'Network error' }
    );
  }
);

export default axiosInstance;
