import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileStack from './ProfileStack';
import HomeStack from './HomeStack';
import HomeActive from '../assets/icons/homeActive.svg';
 import Heart from '../assets/icons/heart.svg';
 
import UserActive from '../assets/icons/UserActive.svg';
  import Notificationbing from "../assets/icons/notification.svg"
 
 import { useMMKVBoolean } from 'react-native-mmkv';
import FavoritesStack from './FavoritesStack';

import NotificationStack from './NotificationStack';
 const Tab = createBottomTabNavigator();

const TabStack = () => {
    const [darkmode]=useMMKVBoolean('darkmode')
    return (
     
         <Tab.Navigator
       
            screenOptions={{ headerShown: false,
                tabBarShowLabel: false,
            //   tabBarActiveTintColor: darkmode ? "#9b8eff" : "#1b1e74",
            //  tabBarInactiveTintColor:darkmode ? "#9b8eff" : "#1b1e74"  ,
             tabBarStyle: { backgroundColor:darkmode?"#1D182A":"#fff" },}}>
            <Tab.Screen
            options={{
                tabBarIcon: ({})=><HomeActive /> //({ focused }) => focused ? <HomeActive /> //: <HomeBar   />,
                // tabBarLabelStyle: { fontSize: 12, marginBottom: 5}
            }}
                name="Home" component={HomeStack} />
          

          <Tab.Screen options={{
            tabBarIcon:({ })=> <Notificationbing/>
          }} name='Notfications' component={NotificationStack}/>
         
         
         
         
         
          <Tab.Screen options={
                {
                    tabBarIcon:({ })=><Heart/>
                }
            
            } name='Favorites'component={FavoritesStack}  />
          
            <Tab.Screen
              options={{
                tabBarIcon: ({   }) =>  <UserActive />  
            }}
            name="Profile" component={ProfileStack} />

            
        </Tab.Navigator>
    
    )
}

export default TabStack


