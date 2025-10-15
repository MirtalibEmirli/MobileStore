/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
// Background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Background message received:', remoteMessage);

  // Show local notification
  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Background Notification',
    body: remoteMessage.notification?.body || 'You have a new message!',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
    },
  });
});

// Notifee background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('🔔 Notifee background event:', type, detail);
});

AppRegistry.registerComponent(appName, () => App);
