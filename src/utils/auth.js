// src/utils/auth.js
import axios from 'axios';
import { getRefreshToken, setToken, setRefreshToken, clearToken } from './store';

export const refreshToken = async () => {
  const token = getRefreshToken();
  if (!token) throw new Error('No refresh token');

  const res = await axios.post('https://ilkinibadov.com/api/v1/auth/refresh', {
    refreshToken: token,
  });

  const { accessToken, refreshToken: newRefresh } = res.data;
  setToken(accessToken);
  setRefreshToken(newRefresh);
  return accessToken;
};