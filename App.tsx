/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import "./global.css"

 import {
  StatusBar,
   useColorScheme,
  View,
  
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'; 


import Login from './src/screens/Login';
import HomePage from './src/screens/HomePage';
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


      <HomePage />


      
    </View>
  );
}

export default App;
