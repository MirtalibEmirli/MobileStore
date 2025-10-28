import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Login from '../screens/Auth/Login';
import Login from '../screens/Auth/Login';
import Login2 from '../screens/Login';
import SignUp from '../screens/Auth/SignUp';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={Login} />
            <Stack.Screen name="SignUpScreen" component={SignUp} />
        </Stack.Navigator>
    )
}

export default AuthStack 