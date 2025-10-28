 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMMKVBoolean } from 'react-native-mmkv';
import AuthStack from './AuthStack';
import TabStack from './TabStack';
import { getIsAuthenticated } from '../utils/auth';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // This reads the MMKV value reactively
  const [isAuthenticated] = useMMKVBoolean('isAuthenticated');

  // Fallback in case MMKV hasn't initialized yet
  const isLoggedIn = isAuthenticated ?? getIsAuthenticated();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Tab" component={TabStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;