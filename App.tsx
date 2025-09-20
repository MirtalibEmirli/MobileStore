 
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

import Navigator from './src/stacks/Navigator'
import { red } from "react-native-reanimated/lib/typescript/Colors";

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
         

      }}
    > 
 
      <Navigator />
      
    </View>
  );
}

export default App;
