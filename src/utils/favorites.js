// src/utils/favorites.js
import api from './api';

export const addToFavorites = async (productId) => {
  try {
    await api.post('/favorites/add', { productId: productId  });
    console.log("added to favorties", productId)
    return true;
  } catch (error) {
    console.error('Add favorite failed:', error.response?.data || error);
    return false;
  }
};

export const removeFromFavorites = async (productId) => {
  try {
await api.delete(`/favorites/delete/${String(productId)}`);
console.log("Removed")
    return true;
  } catch (error) {
    console.error('Remove favorite failed:', error.response?.data || error);
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const res = await api.get('/favorites/products');
    return res.data.products || [];
  } catch (error) {
    console.error('Get favorites failed:', error.response?.data || error);
    return [];
  }
};