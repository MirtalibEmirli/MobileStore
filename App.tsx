/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./global.css"

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Hello from './src/srceens/Hello';
import Count from './src/srceens/Count';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
        justifyContent: 'center',
        alignItems: 'center',

        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}
    >


      <Count/>
      {/* <Hello /> */}
       {/* <Button title='Click ' color='green' onPress={()=>{Alert.alert("Button Clicked!")}}></Button> */}
   
   
    </View>
  );
}

export default App;
