// src/screens/SearchScreen.jsx
import  { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import StyledView from '../components/StyledView';
import StyledText from '../components/StyledText';
import ListAll from '../components/homepage/ListAll';
import BackArrow from '../assets/icons/back-arrow.svg';
import SearchIcon from '../assets/icons/searchnormal1.svg';
 import SearchIcon2 from '../assets/icons/search 1.svg'
import FastImage from 'react-native-fast-image';

const SearchScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialTerm = route.params?.searchTerm || '';

  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------------------------------
  // SEARCH API CALL
  // -------------------------------------------------
  const performSearch = async (term) => {
    if (!term.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://ilkinibadov.com/api/v1/search?searchterm=${(term)}`
      );
      console.log(res.data.content)
      setResults(res.data.content);
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
      if (msg === 'Search query too short') {
        Alert.alert('Oops', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Debounce – wait 400 ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => performSearch(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // -------------------------------------------------
  // UI
  // -------------------------------------------------
  return (
    <StyledView className="flex-1 bg-white">
      {/* Header + Search Bar */}
      <View className="px-4 pt-12 pb-4 bg-white">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrow width={24} height={24} />
          </TouchableOpacity>

          <View className="flex-1 mx-3 flex-row items-center bg-gray-100 rounded-full px-4 h-12">
            <SearchIcon width={18} height={18} className="mr-2" />
            <TextInput
              placeholder="Search"
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="flex-1 text-base text-gray-800"
              placeholderTextColor="#9CA3AF"
              autoFocus
            />
            {searchTerm ? (
              <TouchableOpacity onPress={() => setSearchTerm('')}>
                <Text className="text-xl text-gray-500 mr-1">×</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* Results Count */}
        {results.length > 0 && !loading && (
          <Text  
            className="text-sm text-gray-600">
                {`${results.length} Results Found`}
          </Text>
        )}
      </View>

     {/* ────── STATES ────── */}
{loading ? (
  <View className="flex-1 items-center justify-center">
    <ActivityIndicator size="large" color="#8E6CEF" />
  </View>
)  : results.length === 0 && searchTerm ? (
  /* ─── EMPTY STATE (SVG) ─── */
  <View className="flex-1 items-center  justify-center px-6">
    
    <View className="mb-6">
      <SearchIcon2 width={100} height={100} />
    </View>

    <StyledText
      value={`Sorry, we couldn't find any  matching result for your Search.`}
      className="text-center text-base text-gray-700 leading-6 mb-8 max-w-xs"
    />

    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="bg-purple-600 rounded-full px-6 py-4 shadow-md"
    >
      <StyledText
        value="Explore Products"
        className="text-white font-semibold text-base"
      />
    </TouchableOpacity>
  </View>
) : (
  <ListAll
    data={results}
    numColumns={2}
    contentContainerStyle={{ paddingHorizontal: 16 }}
  />
)}
    </StyledView>
  );
};

export default SearchScreen;