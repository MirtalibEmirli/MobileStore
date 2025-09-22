import { FlatList, Image, Text, View ,TouchableOpacity} from "react-native";

import StyledText from "../StyledText";
import { Link, useNavigation } from "@react-navigation/native";
const List = ({ data, tittle ,selectedCategory}) => {

  const navigation = useNavigation()
  return (
    <>
      <StyledText value={tittle} 
      className={`text-2xl font-semibold ml-4 mb-2 mt-5 ${selectedCategory==='All'||
      selectedCategory===data[0]?.category?' ':'hidden' }`}/>
       
      {/* <Link   screen={"DetailsScreen"}>Link to Mart</Link> */} 
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-4"
        ListEmptyComponent={
          <View className={`${selectedCategory
            ==='All'||selectedCategory===data[0]?.category?'hidden':''
          }`}>
            <Text className="text-center mt-5">No Data Found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> navigation.navigate("DetailsScreen",{item:item})  }
            key={item.id}
            className={`w-[200px] border-[1px] border-zinc-300 rounded-lg overflow-hidden 
              ${item.category===selectedCategory||selectedCategory==='All' ? '' :'hidden' }`}
          >
            <Image source={{uri:item.image}} className='h-[150px] w-full  
             object-scale-down'/>
            <View className="p-2">

               <StyledText  className='text-base font-semibold' value={item.title}>

               </StyledText>

                <StyledText className='mt-1 text-zinc-500
                 text-sm' >{item.price}</StyledText>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default List;
