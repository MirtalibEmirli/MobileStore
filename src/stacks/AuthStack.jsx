import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from '../screens/Auth/Login';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={Login} />
        </Stack.Navigator>
    )
}

export default AuthStack 