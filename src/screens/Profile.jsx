import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native'
import React from 'react'
 import { useMMKVBoolean } from 'react-native-mmkv';
import StyledView from '../components/StyledView';
import {useTranslation} from 'react-i18next';
import LanguageSelect from '../components/LanguageSelect';
import MockUser from "../assets/icons/profile"
import StyledText from '../components/StyledText';

import {clearToken} from '../utils/store'
const Profile = () => {
  const {t} = useTranslation();
      const [isAuthenticated,setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  return (
   <StyledView className=" ">
  <View className="flex-1 relative   items-center gap-5">
    <View className="w-full items-end p-5">
      <LanguageSelect />
      
    </View>

 <View className='bg-sky-500 w-[200px] h-[250px] rounded-xl items-center gap-3 p-5'>
     <View className="border-2 rounded-full mt-20 border-gray-800">
    <MockUser   width={100} height={100}  />
    </View>
    <StyledText  value={"John Doe"} className={"font-orbitron-semibold text-lg"}></StyledText>

 </View>
    <TouchableOpacity
      className="w-full absolute bottom-0 bg-slate-800 px-5 py-5"
      onPress={() =>clearToken()}
    >
      <Text className="text-center text-white text-xl font-orbitron">
        {t("logout")}
      </Text>
    </TouchableOpacity>
  </View>
</StyledView>

  )
}

export default Profile

 