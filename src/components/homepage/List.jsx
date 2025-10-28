import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import StyledText from '../StyledText';
import { useNavigation } from '@react-navigation/native';
 
import Like from '../Like';

const List = ({ data,   selectedCategory }) => {
  const navigation = useNavigation();


  console.log(data,"Lsite gelen data formasi")
 if (data.length === 0) return null;
  return (
    <View className="mb-8">
      
        
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
        renderItem= { ({ item }) => (
          item.category === selectedCategory || selectedCategory === 'all' ? (
            <TouchableOpacity  
              onPress={() => navigation.navigate("DetailsScreen", { productId :item._id })}
              style={{
                position: 'relative',
                width: 159,
                height: 209,
                marginRight: 12,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
                elevation: 5,  
              }}
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
                    className="text-base font-semibold text-gray-900 line-clamp-2"
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

                {/* <TouchableOpacity style={{ position: 'absolute', top: 8, right: 8 }} > */}
     {/* <Like productId={item._id} width={22} height={22} color="#8E6CEF" /> */}

                {/* </TouchableOpacity> */}


            </TouchableOpacity>
          ) : null
        )}
      />
    </View>
  );
};

export default List;