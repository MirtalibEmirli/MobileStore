import { FlatList, TouchableOpacity, Text } from 'react-native'
import React from 'react'

const Banner = () => {

  const items=[
    {id:1,
      message:"50% off on all products",
      bgColor:"bg-indigo-400"
    },

    {id:2,
      message:"Buy 1 get 1 free",
      bgColor:"bg-green-400"
    },
  ]
  return (
    <FlatList showsHorizontalScrollIndicator
    ={false}  contentContainerClassName='-gap-8  my-5 px-3' horizontal renderItem={({item})=>(
      <TouchableOpacity key={item.id} className={` ${item.bgColor} w-[50%] h-[200px] justify-center items-center

       p-4 ml-1 rounded-lg min-w-[300px]`}>
        <Text className=' text-center text-white '>{item.message}</Text>
      </TouchableOpacity>
    )}
    data={items}>


    </FlatList>
  )
}

export default Banner

 