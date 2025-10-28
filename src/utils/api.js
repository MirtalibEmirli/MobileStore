// src/utils/api.js
import axios from 'axios';
import { getToken, getRefreshToken, setToken, setRefreshToken, clearToken } from './store';
import { refreshToken } from './auth';

const api = axios.create({
  baseURL: 'https://ilkinibadov.com/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ---- Request: add Bearer token ----
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Response: 401 → refresh + queue ----
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(t => {
            original.headers.Authorization = `Bearer ${t}`;
            return api(original);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const newToken = await refreshToken();
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        processQueue(e, null);
        clearToken();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;