import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, useRoute } from '@react-navigation/native'

const Details = () => {
  const route = useRoute()
  const item = route.params.item;
  return (
    <View className='flex-1     p-4'>
      <Image resizeMode='cover' className='h-[250px] rounded-lg bg-zinc-300   w-full  '
       source={{uri:item.image}}/>
         <Text className='font-bold   text-2xl mt-6   '>{item.title}</Text>
   
<View className="flex-row mt-5 gap-3">
  <Text className=" text-2xl p-3   text-white bg-gray-500 rounded-lg font-medium">
    {item.price}$
  </Text>
  <Text className="  p-3 text-2xl  text-white bg-gray-500 rounded-lg">
    {item.category}
  </Text>
</View>

   <TouchableOpacity className='bg-purple-600 text-right rounded-lg w-[100px] 
   items-center p-2 mt-10'>
      <Link screen={"HomeScreen"}> 
       <Text className='text-black  text-xl'>
       Go Back  </Text>

       </Link>
       </TouchableOpacity>
     </View>
  )
}

export default Details

 