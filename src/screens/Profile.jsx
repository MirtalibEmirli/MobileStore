// src/screens/Profile.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
 
} from 'react-native';
import {useMMKVBoolean} from 'react-native-mmkv';
import {useTranslation} from 'react-i18next';
import StyledView from '../components/StyledView';
import StyledText from '../components/StyledText';
import LanguageSelect from '../components/LanguageSelect';
import MockUser from '../assets/icons/profile';   
import {clearToken} from '../utils/store';
import Arrow from '../assets/icons/arrowright2.svg'
const Profile = () => {
  const {t} = useTranslation();
  const [isAuthenticated, setIsAuthenticated] =
    useMMKVBoolean('isAuthenticated');

  return (
    <StyledView className="flex-1 bg-white">
       
       
       <View className="items-center pt-12 pb-8 bg-gray-50">
    
        <View className="w-24 h-24 rounded-full bg-gray-300
         items-center justify-center overflow-hidden border-2 border-gray-400">
          <MockUser width={80} height={80} />
        </View>
      </View>

    
<View className="px-5 mt-6 flex gap-2 space-y-2">
      
      

      <TouchableOpacity className="flex  h-[73px]  
         py-4 px-4 bg-gray-100 rounded-lg">
         <StyledText
          value="Gilbert Jones"
          className=" text-lg font-semibold text-gray-900 font-orbitron-semibold"
        />

  
        <Text className=" font-orbitron-semibold  text-sm text-gray-500">
          Gilbertjones001@gmail.com
        </Text>
      </TouchableOpacity>

         <TouchableOpacity className="flex-row  h-[56px] items-center justify-between py-4 px-4 bg-gray-100 rounded-lg">
          <Text className="text-sm font-orbitron-semibold text-gray-800">{t("support")}</Text>
          <Arrow height={24} width={24}/>
        </TouchableOpacity>

    
        <TouchableOpacity className="flex-row  h-[56px] items-center justify-between py-4 px-4 bg-gray-100 rounded-lg">
          <Text className="text-sm font-orbitron-semibold text-gray-800">{t("terms_and_conditions")}</Text>
          <Arrow height={24} width={24}/>
        </TouchableOpacity>
      </View>

      
      <View className="absolute top-6 right-5">
        <LanguageSelect />
      </View>

 
      <View className="absolute bottom-24 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => {
            clearToken();
            setIsAuthenticated(false);
          }}
          className=" px-12 py-3 rounded-full">
          <Text className="text-[#FA3636]  font-orbitron-semibold text-xl   ">{t("logout")}</Text>
        </TouchableOpacity>
      </View>
 
    </StyledView>
  );
};

export default Profile;