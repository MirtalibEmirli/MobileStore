import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/Home/HomePage';
import Details from '../screens/Home/Details';
import DiscountedItems from '../screens/Home/Discount';
import Allcategoriess from '../screens/Home/AllCategories'
import CategoryProductes from '../screens/Home/CategoryProducts'
import AllProduct from '../screens/AllProducts'
import Searchh from '../screens/Search'
import CartPage from '../screens/Cart'
import OrderPage from '../screens/OrderSuccessScreen'
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomePage} />
            <Stack.Screen options={{animation:"none"}} name="DetailsScreen" component={Details} />
            <Stack.Screen name="DiscountedItemsScreen" component={DiscountedItems} />
            <Stack.Screen name="AllCategoriesScreen" component={Allcategoriess} />
            <Stack.Screen name="CategoryProductsScreen" component={CategoryProductes} />
            <Stack.Screen name="AllProductsScreen" component={AllProduct} />
            <Stack.Screen name="SearchScreen" component={Searchh} />
            <Stack.Screen name="CartScreen" component={CartPage} />
            <Stack.Screen name="OrderScreen" component={OrderPage} />
        </Stack.Navigator>
    )
}

export default HomeStack 