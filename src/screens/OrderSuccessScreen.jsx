// src/screens/OrderSuccessScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Replace with your actual success illustration (317.79 x 252)
import SuccessIllustration from '../assets/icons/success.svg';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">

      {/* ---------- Purple Top Section ---------- */}
      <View className="bg-[#8E6CEF] flex-1 items-center   justify-center px-6  ">
        <SuccessIllustration height={330} width={330}
        
        />
      </View>

      {/* ---------- White Bottom Card ---------- */}
      <View className="bg-white rounded-t-3xl -mt-8 px-6 pt-8 pb-12 shadow-lg">
        <Text className="text-2xl font-bold text-gray-900 text-center">
          Order Placed{'\n'}Successfully
        </Text>

        <Text className="mt-4 text-base text-gray-600 text-center">
          You will receive an email{'\n'}confirmation
        </Text>

        {/* ---------- Return Button ---------- */}
        <TouchableOpacity
          onPress={() => navigation.replace('HomeScreen')} // or 'Main', 'TabNavigator'
          className="mt-8 mx-auto bg-[#8E6CEF] rounded-full px-12 py-4 w-[342px]"
        >
          <Text className="text-white text-lg font-bold text-center">
            Return to Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;