// src/utils/basket.js
import api from './api';

export const getBasket = async () => {
  try {
    const { data } = await api.get('/basket/products');
     
    return data;
  } catch (e) {
    console.error('Get basket failed:', e.response?.data || e.message);
    return [];               // ← fallback
  }
};

export const updateBasketItem = async (basketItemId, newCount) => {
  try {
        console.log("BAsketid",basketItemId)

    await api.patch(`/basket/update/:id`, { basketItemId,newCount });
    return true;
  } catch (e) {
    console.error('Update failed:', e.response?.data || e.message);
    return false;
  }
};

export const removeBasketItem = async (basketItemId) => {
  try {
    console.log("BAsketid",basketItemId)
    await api.delete(`/basket/delete/${basketItemId}`);
    return true;
  } catch (e) {
    console.error('Remove failed:', e.response?.data || e.message);
    return false;
  }
};

export const addToBasket = async (productId, count) => {
  try {
    await api.post('/basket/add', { productId: String(productId), count });
    return true;
  } catch (e) {
    console.error('Add to basket failed:', e.response?.data || e.message);
    return false;
  }
};