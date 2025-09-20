import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import TabStack from './TabStack';
 import { useMMKVBoolean } from 'react-native-mmkv';
const Stack = createNativeStackNavigator();
 
const Navigator = () => {
    // const [isAuthenticated,setIsAuthenticated] = useMMKVBoolean('isAuthenticated', false);
    const [isAuthenticated]=useMMKVBoolean('isAuthenticated');
   
 
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {isAuthenticated ? <Stack.Screen name="Tab" component={TabStack} /> : <Stack.Screen name="Auth" component={AuthStack} />}
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
 
export default Navigator
 
 