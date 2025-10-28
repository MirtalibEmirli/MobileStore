// src/utils/store.js
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

// Use SAME keys everywhere
export const getToken = () => storage.getString('accessToken');
export const getRefreshToken = () => storage.getString('refreshToken');

export const setToken = (token) => storage.set('accessToken', token);
export const setRefreshToken = (token) => storage.set('refreshToken', token);

export const clearToken = () => {
  storage.delete('accessToken');
  storage.delete('refreshToken');
};

// Auth state
export const setIsAuthenticated = (value) => storage.set('isAuthenticated', value);
export const getIsAuthenticated = () => storage.getBoolean('isAuthenticated') || false;
export const clearAuth = () => {
  storage.delete('isAuthenticated');
  storage.delete('accessToken');
  storage.delete('refreshToken');
};