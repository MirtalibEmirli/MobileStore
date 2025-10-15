import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import HomeActive from '../assets/icons/homeActv.svg';
import Home from '../assets/icons/house.svg';
 import User from '../assets/icons/_user.svg';
import UserActive from '../assets/icons/user.svg';

const Tab = createBottomTabNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false,
             tabBarActiveTintColor: "#1b1e74",
             tabBarInactiveTintColor: "#ababab"}}>
            <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => focused ? <HomeActive /> : <Home />,
                // tabBarLabelStyle: { fontSize: 12, marginBottom: 5}
            }}
                name="Home" component={HomeStack} />
            <Tab.Screen
              options={{
                tabBarIcon: ({ focused }) => focused ? <UserActive /> : <User />
            }}
            name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default TabStack


