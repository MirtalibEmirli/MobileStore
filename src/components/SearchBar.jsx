// src/components/SearchBar.jsx
import React, { useState } from 'react';
import {   TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../assets/icons/searchnormal1.svg';

const SearchBar = () => {
  const navigation = useNavigation();
  const [text, setText] = useState('');

  const goToSearch = () => {
    if (text.trim()) {
      navigation.navigate('SearchScreen', { searchTerm: text.trim() });
    } else {
      navigation.navigate('SearchScreen');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={goToSearch}
      className="flex-row items-center bg-gray-200 mx-4 my-4 h-[54px] rounded-full shadow-sm border border-gray-300 px-4"
    >
      <SearchIcon width={16} height={16} color="#8E6CEF" />
      <TextInput
        placeholder="Productname"
        value={text}
        onChangeText={setText}
        onSubmitEditing={goToSearch}           
        returnKeyType="search"
        className="ml-2 flex-1 text-[15px] text-gray-600"
        placeholderTextColor="gray-600"
      />
    </TouchableOpacity>
  );
};

export default SearchBar;