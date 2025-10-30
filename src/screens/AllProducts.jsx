 
import { View, Text, FlatList,   TouchableOpacity } from 'react-native';
 
import { useNavigation } from '@react-navigation/native';
 
import FastImage from 'react-native-fast-image';
import StyledText from '../components/StyledText';
 
 import GoBack from '../components/GoBack'

 import Like from '../components/Like'
const AllProducts = ({ route }) => {
  const { Title ,products } = route.params;  
     
  const navigation = useNavigation(); 
 
 

  return ( 
    <View className="flex-1 p-4  relative bg-white">
      <GoBack top={10} left={4}/>
      <Text className="text-2xl  mt-20 font-bold text-black mb-4">{Title} ({products.length})</Text>
      
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
     <Like/>

                </TouchableOpacity>


            </TouchableOpacity>
            
        )}
     
      />
    </View>
  );
};

export default AllProducts;
