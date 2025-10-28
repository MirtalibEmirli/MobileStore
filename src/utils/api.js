// src/utils/api.js
import axios from 'axios';
import { getToken } from './store';
import { refreshToken } from './auth';

const api = axios.create({
  baseURL: 'https://ilkinibadov.com/api/v1',   // ← FULL DOMAIN
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ---- Add Bearer token ----
api.interceptors.request.use(cfg => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// ---- 401 → refresh (queue) ----
let isRefreshing = false;
let failedQueue = [];

const processQueue = (err, token = null) => {
  failedQueue.forEach(p => (err ? p.reject(err) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  r => r,
  async err => {
    const orig = err.config;
    if (err.response?.status === 401 && !orig._retry) {
      orig._retry = true;

      if (isRefreshing) {
        return new Promise((res, rej) => failedQueue.push({ res, rej }))
          .then(t => {
            orig.headers.Authorization = `Bearer ${t}`;
            return api(orig);
          })
          .catch(e => Promise.reject(e));
      }

      isRefreshing = true;
      try {
        const newT = await refreshToken();
        processQueue(null, newT);
        orig.headers.Authorization = `Bearer ${newT}`;
        return api(orig);
      } catch (e) {
        processQueue(e, null);
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;