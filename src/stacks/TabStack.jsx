import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack 