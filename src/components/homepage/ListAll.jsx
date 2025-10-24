import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import StyledText from '../StyledText';
import { useNavigation } from '@react-navigation/native';
import HeartIcon from '../../assets/icons/heart.svg'; // Assume this is your heart icon SVG

const ListAll = ({ data, title  }) => {
  const navigation = useNavigation();
console
.log("AllList component data:", data,title); 
  return (
    <View className="mb-8">
      <StyledText value={title} className="text-2xl font-bold text-gray-800 ml-6 mb-4" />
     
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 10 }}
        renderItem={({ item }) => (
      
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsScreen", { item })}
              style={{
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
                    className="mt-1 text-sm font-medium text-gray-700"
                  />
                </View>
                <TouchableOpacity
                  style={{ alignSelf: 'flex-end', padding: 4 }}
                >
                  <HeartIcon width={22} height={22} color="#8E6CEF" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
           
        )}
      />
    </View>
  );
};

export default ListAll;