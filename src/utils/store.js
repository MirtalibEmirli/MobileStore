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












// Notifications storage methods
export const saveNotification = (notification) => {
  try {
    // Get existing notifications
    const existingNotifications = getNotifications()

    // Create notification object with isRead flag
    const notificationData = {
      id: notification.messageId || `${Date.now()}-${Math.random()}`,
      title: notification.notification?.title || 'Notification',
      body: notification.notification?.body || '',
      data: notification.data || {},
      sentTime: notification.sentTime || Date.now(),
      receivedTime: Date.now(),
      isRead: false,
      from: notification.from,
      priority: notification.priority,
    }

    // Add new notification to the beginning of the array
    const updatedNotifications = [notificationData, ...existingNotifications]

    // Save to storage
    storage.set('notifications', JSON.stringify(updatedNotifications))

    return true
  } catch (error) {
    console.error('Error saving notification:', error)
    return false
  }
}

export const getNotifications = () => {
  try {
    const notificationsString = storage.getString('notifications')
    return notificationsString ? JSON.parse(notificationsString) : []
  } catch (error) {
    console.error('Error getting notifications:', error)
    return []
  }
}

export const markNotificationAsRead = (notificationId) => {
  try {
    const notifications = getNotifications()
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    )
    storage.set('notifications', JSON.stringify(updatedNotifications))
    return true
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return false
  }
}

export const markAllNotificationsAsRead = () => {
  try {
    const notifications = getNotifications()
    const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }))
    storage.set('notifications', JSON.stringify(updatedNotifications))
    return true
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }
}

export const clearAllNotifications = () => {
  try {
    storage.set('notifications', JSON.stringify([]))
    return true
  } catch (error) {
    console.error('Error clearing notifications:', error)
    return false
  }
}