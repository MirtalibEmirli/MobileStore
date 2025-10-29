// // src/screens/CartScreen.jsx
// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import GoBack from '../components/GoBack';
// import { getBasket, updateBasketItem, removeBasketItem } from '../utils/basket';

// const Cart = () => {
//   const navigation = useNavigation();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadBasket = useCallback(async () => {
//     setLoading(true);
//     const data = await getBasket();
//     setItems(data);
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const unsub = navigation.addListener('focus', loadBasket);
//     loadBasket();
//     return unsub;
//   }, [navigation, loadBasket]);

//   const changeQty = async (basketItemId, current, delta) => {
//     const newCount = Math.max(1, current + delta);
//     const ok = await updateBasketItem(basketItemId, newCount);
//     if (ok) loadBasket();
//     else Alert.alert('Error', 'Could not update quantity');
//   };

//   const remove = async (basketItemId) => {
//     Alert.alert('Remove Item', 'Are you sure you want to delete this item?', [
//       { text: 'Cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: async () => {
//           const ok = await removeBasketItem(basketItemId);
//           if (ok) loadBasket();
//         },
//       },
//     ]);
//   };

//   const total = items.reduce((sum, i) => sum + i.product.price * i.count, 0).toFixed(2);

//   if (loading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <ActivityIndicator size="large" color="#8B5CF6" />
//       </View>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <Text className="text-lg text-gray-600">Your bag is empty</Text>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           className="mt-6 px-8 py-3 bg-purple-600 rounded-full"
//         >
//           <Text className="text-white font-semibold">Continue Shopping</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50">
//       {/* Header */}
//       <View className="flex-row items-center px-6 pt-14 pb-4 bg-white">
//         <GoBack onPress={() => navigation.goBack()} />
//         <Text className="flex-1 text-center text-xl font-bold text-gray-900">Cart</Text>
//         <View style={{ width: 40 }} />
//       </View>

//       {/* Items List */}
//       <FlatList
//         data={items}
//         keyExtractor={(i) => i._id}
//         contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 }}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View className="flex-row bg-white rounded-2xl p-4 mb-4 shadow-sm">
//             {/* Product Image */}
//             <Image
//               source={{ uri: item.product.images[0] }}
//               className="w-20 h-20 rounded-xl"
//               resizeMode="cover"
//             />

//             {/* Details */}
//             <View className="flex-1 ml-4">
//               <Text className="text-base font-medium text-gray-800" numberOfLines={2}>
//                 {item.product.title}
//               </Text>

//               {/* Price */}
//               <Text className="text-lg font-bold text-purple-600 mt-1">
//                 {item.product.currency}{item.product.price.toFixed(2)}
//               </Text>

//               {/* Quantity Controls */}
//               <View className="flex-row items-center mt-3">
//                 <TouchableOpacity
//                   onPress={() => changeQty(item._id, item.count, -1)}
//                   className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center"
//                 >
//                   <Text className="text-purple-600 text-lg font-bold">−</Text>
//                 </TouchableOpacity>

//                 <Text className="mx-4 text-base font-semibold text-gray-800">
//                   {item.count}
//                 </Text>

//                 <TouchableOpacity
//                   onPress={() => changeQty(item._id, item.count, 1)}
//                   className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center"
//                 >
//                   <Text className="text-purple-600 text-lg font-bold">+</Text>
//                 </TouchableOpacity>

//                 {/* Remove */}
//                 <TouchableOpacity
//                   onPress={() => remove(item._id)}
//                   className="ml-auto"
//                 >
//                   <Text className="text-red-500 text-sm font-medium">Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         )}
//       />

//       {/* Footer: Total + Checkout */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-5 border-t border-gray-200">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-lg font-medium text-gray-700">Total</Text>
//           <Text className="text-2xl font-bold text-gray-900">${total}</Text>
//         </View>

//         <TouchableOpacity className="bg-purple-600 rounded-full py-4 items-center">
//           <Text className="text-white text-lg font-bold">Place Order</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };
// src/screens/CartScreen.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Header from '../components/Header';
import { getBasket, updateBasketItem, removeBasketItem } from '../utils/basket';
import Canta from "../assets/icons/cantata.svg"
const Cart = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState( []);   // ← default empty array
  const [loading, setLoading] = useState(true);

  //basketTotal   currency
const [ mainData,setMainData] =useState({})

  const loadBasket = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBasket();
      console.log(data.content )
      setMainData(data)
      setItems(data.content);
   
    } catch (e) {
      console.error('Load basket error:', e);
      setItems([]);
      // data
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBasket();
    }, [loadBasket])
  );

  const changeQty = async (basketItemId, current, delta) => {
    const newCount = Math.max(1, current + delta);
    const ok = await updateBasketItem(basketItemId, newCount);
    if (ok) loadBasket();
  };
const remove = async (basketItemId) => {
    const ok = await removeBasketItem(basketItemId);
    if (ok) loadBasket();
  };

  // NEW: Place Order → Delete ALL items → Go to success
  const placeOrder = async () => {
    if (items.length === 0) return;
   try {
              // Delete every item using your working removeBasketItem
              for (const item of items) {
                await removeBasketItem(item.id);
              }
              // Navigate to success screen
              navigation.replace('OrderScreen');
            } catch (err) {
              Alert.alert("Error", "Failed to place order. Try again.");
            } finally {
              setLoading(false);
            }
  };
  const total = mainData.basketTotal //mainData.count;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">

        <Canta height={70} width={70}/>
        <Text className="text-lg mt-10 font-medium text-black">Your Cart is empty</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mt-6 px-10 py-3 bg-purple-600 rounded-full"
        >
          <Text className="text-white font-semibold">Explore Categories</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Cart" />

      <FlatList
        data={items}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
       renderItem={({ item }) => (
  <View className="bg-gray-100 rounded-2xl p-4 mb-3 flex-row items-center">
    {/* Product Image */}
    <Image
      source={{ uri: item?.image || 'https://via.placeholder.com/80' }}
      className="w-20 h-20 rounded-xl bg-gray-200"
      resizeMode="cover"
    />

    {/* Details */}
    <View className="flex-1 ml-4">
      {/* Title + Price on same line */}
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-medium text-gray-800 flex-1" numberOfLines={1}>
          {item?.title || '—'}
        </Text>
        <Text className="text-base font-bold text-gray-900 ml-2">
          {item?.currency || '$'}
          {parseFloat(item?.pricePerItem || 0).toFixed(2)}
        </Text>
      </View>

      {/* Quantity + Remove */}
      <View className="flex-row items-center mt-3 justify-between">
        {/* Quantity Controls */}
        <View className="flex-row items-center bg-white rounded-full px-2">
          <TouchableOpacity
            onPress={() => changeQty(item.id, item.count, -1)}
            className="w-8 h-8 items-center justify-center"
          >
            <Text className="text-purple-600 text-xl font-bold">−</Text>
          </TouchableOpacity>

          <Text className="mx-3 text-base font-semibold text-gray-800">
            {item.count}
          </Text>

          <TouchableOpacity
            onPress={() => changeQty(item.id, item.count, 1)}
            className="w-8 h-8 items-center justify-center"
          >
            <Text className="text-purple-600 text-xl font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Remove */}
        <TouchableOpacity onPress={() => remove(item.id)}>
          <Text className="text-red-500 text-sm font-medium">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-5 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-medium text-gray-700">Total</Text>
          <Text className="text-2xl font-bold text-gray-900">${total}</Text>
        </View>
        
        
        <TouchableOpacity onPress={()=>placeOrder()} className="bg-purple-600 rounded-full py-4 items-center">
          <Text className="text-white text-lg font-bold">Place Order</Text>

        </TouchableOpacity>


      </View>
    </View>
  );
};

export default Cart;