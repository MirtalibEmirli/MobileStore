// src/screens/ProductDetailsScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Like from '../../components/Like';
import GoBack from '../../components/GoBack';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params || {};

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
      fetchSimilarProducts();
    }
    console.log("ID ",productId)
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`https://ilkinibadov.com/api/v1/products/${productId}/details`);
      setProduct(res.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load product.';
      setError(msg);
      if (msg === 'Invalid product ID') {
        Alert.alert('Error', 'This product does not exist.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
      }
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const res = await axios.get(`https://ilkinibadov.com/api/v1/products/${productId}/similar`);
      setSimilar(res.data);
    } catch (err) {
      console.log('Similar products failed (optional)', err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text className="mt-3 text-gray-600">Loading product...</Text>
      </View>
    );
  }

  if (error && error !== 'Invalid product ID') {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      
      
       <GoBack/>
  
      </View>
    );
  }

  if (!product) return null;

  return (
    <View className="flex-1 bg-white px-3  ">
      <ScrollView showsVerticalScrollIndicator={false}>
       {/* Header */}
<View className="relative mt-10 px-6 pt-12 pb-4">
  {/* Back Button */}
  <GoBack
    onPress={() => navigation.goBack()}
    top={2}
    left={0}
  />

  {/* Like Button */}
  <Like
    onPress={() => setIsWishlisted(!isWishlisted)}
    isLiked={isWishlisted}
    top={6}
    right={4}
    productId={productId}
    size={30}
    bg='#F4F4F4'
  />
</View>

        {/* Image Carousel */}
        <View className="h-[250px]    ">
          <Image
            source={{ uri: product.images[activeImageIndex] }}
            className="w-full h-full"
            resizeMode="contain"
          />
          {/* Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {product.images.map((_, i) => (
              <View
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === activeImageIndex ? 'bg-purple-600 w-6' : 'bg-gray-400'
                }`}
              />
            ))}
          </View>
          {/* Thumbnails */}
          <View className="absolute bottom-4 left-4 flex-row gap-2">
            {product.images.map((img, i) => (
              <TouchableOpacity key={i} onPress={() => setActiveImageIndex(i)}>
                <Image
                  source={{ uri: img }}
                  className={`w-16 h-16 rounded-lg border-2 ${
                    i === activeImageIndex ? 'border-purple-600' : 'border-transparent'
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Title & Price */}
        <View className="px-6 mt-6">
          <Text className="text-xl font-bold text-gray-900">{product.title}</Text>
          <Text className="text-2xl font-bold text-purple-600 mt-1">
            {product.currency}{product.price.toFixed(2)}
          </Text>
        </View>

      {/* Quantity */}
<View className="flex-row items-center w-[250px] rounded-full
 px-6 mt-6    bg-[#F4F4F4] h-20  justify-between bg-#F4F4F4">

  <Text className="text-xl font-medium text-gray-700 mr-6">Quantity</Text>

  <View className="flex-row items-center     rounded-full overflow-hidden">
    {/* Minus Button */}
    
    <TouchableOpacity
      onPress={() => setQuantity(Math.max(1, quantity - 1))}
      className="w-12 h-[40px] bg-purple-600 rounded-full   items-center justify-center"
    >
      <Text className="text-white text-xl font-bold">−</Text>
    </TouchableOpacity>

    {/* Quantity Number */}
    <Text className="mx-6 text-base font-medium ml-2   text-gray-800">{quantity}</Text>



    {/* Plus Button */}
    <TouchableOpacity
      onPress={() => setQuantity(quantity + 1)}
      className="w-12 h-[40px] bg-purple-600  ml-2 rounded-full items-center justify-center"
    >
      <Text className="text-white text-xl font-bold">+</Text>
    </TouchableOpacity>



  </View>
</View>


        {/* Description */}
        <View className="px-6 mt-6">
          <Text className="text-base text-gray-600 leading-6">{product.description}</Text>
        </View>

        {/* Shipping */}
        <View className="px-6 mt-6">
          <Text className="text-base font-semibold text-gray-900">Shipping & Returns</Text>
          <Text className="text-sm text-gray-600 mt-1">
            Free standard shipping and free 60-day returns
          </Text>
        </View>

        {/* Similar Items */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-[#8E6CEF]">Similar Items</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("AllProductsScreen",{products:similar,Title:"Similar Prdocuts"})}>
              <Text className="text-lg font-medium text-black">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={similar}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.replace('DetailsScreen', { productId: item._id })}
                className="mr-4"
              >
                <View className="w-40 h-56 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <Image source={{ uri: item.images[0] }} className="w-full h-32" resizeMode="cover" />
                  <View className="p-3">
                    <Text className="text-sm font-medium text-gray-800" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="text-base font-bold text-gray-900 mt-1">
                      {item.currency}{item.price.toFixed(2)}
                    </Text>
                  </View>
                  <TouchableOpacity className="absolute top-2 right-2 p-1 bg-white/80 rounded-full">
                 <Like productId={item._id }/>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Bottom Add to Bag */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <TouchableOpacity className="bg-purple-600 rounded-full py-4 flex-row items-center justify-center">
          <Text className="text-white font-bold text-lg mr-3">
            {product.currency}{(product.price * quantity).toFixed(2)}
          </Text>
          <Text className="text-white font-bold text-lg">Add to Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default  Details ;