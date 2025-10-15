import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import Animated, { FlipInXUp,FlipInEasyX,FlipInYLeft } from 'react-native-reanimated';

const Details = () => {
  const route = useRoute();
  const item = route.params.item;

  return (
    <Animated.View entering={FlipInYLeft.duration(500).delay(200)}  className="flex-1 p-4">
      <FastImage
        resizeMode="contain"
        style={{ height: 250, width: '100%', marginTop: 70, backgroundColor: 'gray' }}
        className="h-[250px] rounded-lg bg-zinc-300 mt-20 w-full"
        source={{ uri: item.image }}
      />

      <Text className="font-bold text-2xl mt-6">{item.title}</Text>

      <View className="flex-row mt-5 gap-3">
        <Text className="text-2xl p-3 text-white bg-gray-500 rounded-lg font-medium">
          {item.price}$
        </Text>
        <Text className="p-3 text-2xl text-white bg-gray-500 rounded-lg">
          {item.category}
        </Text>
      </View>

      <TouchableOpacity className="bg-purple-600 rounded-lg w-[100px] items-center p-2 mt-10">
        <Link screen="HomeScreen">
          <Text className="text-black text-xl">Go Back</Text>
        </Link>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Details;
