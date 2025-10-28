// src/utils/store.js
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// SAFE SETTERS
export const setToken = (token) => {
  if (typeof token === 'string' && token.length > 0) {
    storage.set('accessToken', token);
  }
};

export const setRefreshToken = (token) => {
  if (typeof token === 'string' && token.length > 0) {
    storage.set('refreshToken', token);
  }
};

export const getToken = () => storage.getString('accessToken') || null;
export const getRefreshToken = () => storage.getString('refreshToken') || null;

export const clearToken = () => {
  storage.delete('accessToken');
  storage.delete('refreshToken');
};

export const setIsAuthenticated = (value) => storage.set('isAuthenticated', value);
export const getIsAuthenticated = () => storage.getBoolean('isAuthenticated') || false;
export const clearAuth = () => {
  storage.delete('isAuthenticated');
  storage.delete('accessToken');
  storage.delete('refreshToken');
};