 
import "./global.css"
import "./src/locales/index"
import { useMMKV, useMMKVObject } from "react-native-mmkv";

 import {
  StatusBar,
   useColorScheme,
  View,
  
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'; 

import Navigator from './src/stacks/Navigator'
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { useTranslation } from "react-i18next";
import { useEffect ,useState} from "react";
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';




 function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const {i18n} = useTranslation();
    const [selectedLanguage, setSelectedLanguage] =  useMMKVObject('selectedLanguage');
 const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    // 1️⃣ Request permissions
    async function requestPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted ::', authStatus);

        // 2️⃣ Get FCM token
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log('FCM Token:', token);
      } else {
        console.log('Notification permission denied');
      }
    }

    requestPermission();

    // 3️⃣ Foreground message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('📩 Foreground message received:', remoteMessage);

      // Show local notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Foreground Notification',
        body: remoteMessage.notification?.body || 'You have a new message!',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
        },
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    //@ts-ignore
    selectedLanguage&& i18n.changeLanguage(selectedLanguage.value)
  },[selectedLanguage])
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}



function AppContent() {
  const insets = useSafeAreaInsets();
 
 
 
 
 
  return (
    <View
      style={{
        flex: 1, 
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
         

      }}
    > 
 
      <Navigator />
      
    </View>
  );
}

export default App;
