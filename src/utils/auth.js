// src/utils/auth.js
import axios from 'axios';
import { getRefreshToken, setToken, setRefreshToken, clearToken } from './store';

export const refreshToken = async () => {
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    console.warn('No refresh token available. User must log in again.');
    clearToken();
    throw new Error('No refresh token');
  }

  try {
    const res = await axios.post('https://ilkinibadov.com/api/v1/auth/refresh', {
      refreshToken: currentRefreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    setToken(accessToken);
    if (newRefreshToken) setRefreshToken(newRefreshToken); // Only if provided

    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data || error);
    clearToken();
    throw error;
  }
};