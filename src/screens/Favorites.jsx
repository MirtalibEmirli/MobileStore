// src/screens/FavoritesScreen.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect ,useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { getFavorites } from '../utils/favorites';
import Like from '../components/Like';

const Favorites = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getFavorites();
      console.log(data)
      setFavorites(data);
    } catch (e) {
      console.error('Load favorites error:', e);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  // Called by <Like /> when toggle completes
  const onFavoriteToggled = (productId, isNowLiked) => {
    if (!isNowLiked) {
      // Remove from local list
      setFavorites(prev => prev.filter(p => p.id !== productId));
    } else {
      // Optional: refetch if needed (rare case)
      loadFavorites();
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-medium text-gray-600 text-center">
          You haven't added any favorites yet.
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="mt-6 px-8 py-3 bg-purple-600 rounded-full"
        >
          <Text className="text-white font-semibold">Explore Products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-14 pb-4">
        <Text className="text-2xl font-bold text-gray-900">
          My Favorites ({favorites.length})
        </Text>
      </View>

      {/* 2-Column Grid */}
      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailsScreen', { productId: item.id })}
            className="w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            {/* Image + Like Button */}
            <View className="relative">
                <FastImage
                source={{ uri: item.image  }}
                style={{ width: '100%', height: 150 }}
                resizeMode="cover"
              />

              {/* Reusable Like Component */}
              <Like
                productId={item.id}
                initialLiked={true}
                top={8}
                right={8}
                size={20}
                bg="bg-white/80"
                onToggle={onFavoriteToggled} // ← new callback
              />
            </View>

            {/* Details */}
            <View className="p-3">
              <Text
                className="text-sm font-medium text-gray-900"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text className="mt-1 text-sm font-bold text-gray-700">
                ${parseFloat(item.price).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Favorites;