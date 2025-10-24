import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/Home/HomePage';
import Details from '../screens/Home/Details';
import DiscountedItems from '../screens/Home/Discount';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomePage} />
            <Stack.Screen options={{animation:"none"}} name="DetailsScreen" component={Details} />
            <Stack.Screen name="DiscountedItemsScreen" component={DiscountedItems} />
        </Stack.Navigator>
    )
}

export default HomeStack 