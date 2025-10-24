import { View, TextInput, Text } from 'react-native';
 
import SearchIcon from '../assets/icons/searchnormal1.svg'; 

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-gray-200 p-2 mx-4 my-4 h-[54px]
     rounded-[100px] shadow-sm border border-gray-300' >
      <Text className='ml-3'></Text>
      <SearchIcon width={16} height={16} color="#8E6CEF"    />
      <TextInput
        placeholder="Search"
         className='   ml-2 text-[15px] text-gray-600' 
        placeholderTextColor="#272727"
      />
    </View>
  );
};

export default SearchBar;