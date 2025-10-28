import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

 
import Vol from '../../assets/icons/volleyball.svg';
import PlugZap from '../../assets/icons/plug-zap.svg';
import Shirt from '../../assets/icons/shirt.svg';
import Sofa from '../../assets/icons/sofa.svg';
import BookCopy from '../../assets/icons/book-copy.svg';
import all from '../../assets/icons/chart-bar-stacked.svg';
import g from '../../assets/icons/fence.svg';
import BackArrow from "../../assets/icons/back-arrow.svg";
import { useNavigation } from '@react-navigation/native';
const AllCategories = () => {
  const navigation = useNavigation(); 
  const allCategories = [
    
    { name: 'Sports', component: Vol },
    { name: 'Electronics', component: PlugZap },
    { name: 'Clothing', component: Shirt },
    { name: 'Furniture', component: Sofa },
    { name: 'Books', component: BookCopy },
    { name: 'Groceries', component: g },
  ];

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <TouchableOpacity
                 onPress={() => navigation.goBack()}
                 className="absolute justify-center items-center top-10  bg-[#F4F4F4] w-[40px] h-[40px] rounded-[100px]"
               >
                 <BackArrow width={30} height={30} />
               </TouchableOpacity>
     
      <View className="mb-2 mt-24">
        <Text className="text-2xl font-bold text-black">Shop by Categories</Text>
      </View>

      <View className="mt-2">
        {allCategories.map((category, index) => (
          <TouchableOpacity   onPress={() => navigation.navigate('CategoryProductsScreen', { categoryName: category.name })} key={index} className="flex-row 
          mt-2 rounded-lg  gap-2 items-center py-3 px-4 border-b
           border-gray-300 bg-[#F4F4F4]">
             <category.component width="40" height="40"   />  
            <Text className="text-lg  font-medium text-gray-800">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default AllCategories;
