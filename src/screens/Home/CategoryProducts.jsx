import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,   TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import FastImage from 'react-native-fast-image';
import StyledText from '../../components/StyledText';
 
 import GoBack from '../../components/GoBack'

 import Like from '../../components/Like'
const CategoryProducts = ({ route }) => {
  const { categoryName } = route.params; // Get the category name passed from previous screen
  const [products, setProducts] = useState([]);
     
  const navigation = useNavigation(); 

   const productsParams = {
        page: 1,
        limit: 20,
        category: categoryName.toLowerCase(),
        currency: '$',
      };
  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =await api.get('/products', { params: productsParams });
        setProducts(response.data.products); // Assuming the API returns a list of products
//         setProducts([
//   {
//     "_id": "68e3ac59fafd4c040e6a3401",
//     "title": "Yoga Mat",
//     "description": "Non-slip yoga mat with comfortable cushioning, ideal for home or gym use.",
//     "category": "sports",
//     "price": 19.99,
//     "currency": "$",
//     "stock": 75,
//     "images": [
//       "https://jadeyoga.com/cdn/shop/products/Jade-Yoga-LevelOne-Mat-Classic-Purple-Flat_1200x1200.jpg?v=1631819938",
//       "https://kataandasana.com/cdn/shop/files/PROlite-YOGA-MAT-PURPLE-LOTUS-01.jpg?v=1745323867"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a3403",
//     "title": "Men's Running Shoes",
//     "description": "Lightweight and comfortable running shoes suitable for all terrains.",
//     "category": "sports",
//     "price": 59.99,
//     "currency": "$",
//     "stock": 80,
//     "images": [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSPtStKHieyrgEGKPAQw6NvAOPDu5hyoZ5jw&s",
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjxcl-5YBtrB4O0EQVw0lnCfOIN4NddTpspst9I2Mp2G3m4gasuW5sy3SbX_S84MDxvp0&usqp=CAU"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a33fd",
//     "title": "Wireless Bluetooth Headphones",
//     "description": "High-quality over-ear headphones with noise cancellation and 30-hour battery life.",
//     "category": "electronics",
//     "price": 129.99,
//     "currency": "$",
//     "stock": 50,
//     "images": [
//       "https://media.very.co.uk/i/very/VH4IV_SQ1_0000000004_BLACK_SLf?$pdp_300x400_x2$&fmt=jpg",
//       "https://static.wixstatic.com/media/5d5913_8461752f1c8b400fb0fe57759c6da4d6~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a33fe",
//     "title": "Men's Casual Shirt",
//     "description": "Comfortable cotton shirt perfect for everyday wear, available in multiple colors.",
//     "category": "clothing",
//     "price": 29.99,
//     "currency": "$",
//     "stock": 120,
//     "images": [
//       "https://i.pinimg.com/474x/a2/4f/e4/a24fe4e11182caaf3eef65df4ebfb90e.jpg",
//       "https://img.kwcdn.com/product/fancy/61fec0c5-adcb-472d-860d-8319aaaae27b.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a3402",
//     "title": "Organic Green Tea",
//     "description": "Premium organic green tea leaves, rich in antioxidants and flavor.",
//     "category": "groceries",
//     "price": 9.99,
//     "currency": "$",
//     "stock": 150,
//     "images": [
//       "https://m.media-amazon.com/images/I/51KvG-bDAdL.jpg",
//       "https://organicindia.com/cdn/shop/files/classic-pack-of-2.jpg?v=1702528164"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a3404",
//     "title": "LED Desk Lamp",
//     "description": "Adjustable LED desk lamp with multiple brightness levels and energy saving mode.",
//     "category": "electronics",
//     "price": 34.99,
//     "currency": "$",
//     "stock": 60,
//     "images": [
//       "https://www.lepower-tec.com/cdn/shop/files/lepower-tec-desk-lamp-for-office-black.jpg?v=1722496317&width=1600",
//       "https://m.media-amazon.com/images/I/81kHHhPnS-L._UF894,1000_QL80_.jpg"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a33ff",
//     "title": "Modern Wooden Chair",
//     "description": "Elegant and sturdy wooden chair suitable for living rooms or offices.",
//     "category": "furniture",
//     "price": 89.99,
//     "currency": "$",
//     "stock": 35,
//     "images": [
//       "https://homeglamour.in/cdn/shop/files/DorisChhair_3.jpg?v=1751739419",
//       "https://5.imimg.com/data5/SELLER/Default/2024/4/410714316/QL/CF/AV/144555086/wooden-chair-set-500x500.jpg"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   },
//   {
//     "_id": "68e3ac59fafd4c040e6a3400",
//     "title": "Children's Story Book Set",
//     "description": "Set of 5 illustrated storybooks suitable for children aged 4-8.",
//     "category": "books",
//     "price": 24.99,
//     "currency": "$",
//     "stock": 200,
//     "images": [
//       "https://m.media-amazon.com/images/I/81X+2yNe9WL._UF1000,1000_QL80_.jpg",
//       "https://images-eu.ssl-images-amazon.com/images/I/91HVfyTvduL._AC_UL600_SR600,600_.jpg"
//     ],
//     "createdAt": "2025-10-06T00:00:00.000Z",
//     "updatedAt": "2025-10-06T00:00:00.000Z"
//   }
// ])
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [categoryName]);

 

  return (
    <View className="flex-1 p-4  relative bg-white">
      <GoBack top={10} left={2}/>
      <Text className="text-2xl  mt-20 font-bold text-black mb-4">{categoryName} ({products.length})</Text>
      
      <FlatList
        data={products}
    numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}

     renderItem={({ item }) => (
       
            <TouchableOpacity  
              onPress={() => navigation.navigate("DetailsScreen", { productId:item._id })}
              className="flex  mt-5 relative w-[159px] h-[209px] mr-3 rounded-lg overflow-hidden bg-white shadow-lg"
            >
       
              
                   <FastImage
                source={{ uri: item.images[0] }}
                style={{ width: '100%', height: 150 }}
                resizeMode="cover"
              />
              <View style={{ padding: 10, flex: 1, justifyContent: 'space-between' }}>
                <View>

                  <StyledText
                    value={item.title}
                    className="text-base font-semibold   h-[20px] text-gray-900 line-clamp-2"
                    numberOfLines={2}
                  />

                  <StyledText
                    value={`$${item.price}`}
                    className="mt-1 text-sm  font-bold text-[#272727] "
                  />
                </View>
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', padding: 4 }}
                >
                  
                </TouchableOpacity>
              </View>

                <TouchableOpacity style={{ position: 'absolute', top: 8, right: 8 }} >
     {/* <Like/> */}

                </TouchableOpacity>


            </TouchableOpacity>
            
        )}
     
      />
    </View>
  );
};

export default CategoryProducts;
