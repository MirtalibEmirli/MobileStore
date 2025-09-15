import { FlatList, Image, Text, View } from "react-native";

const List = ({ data, tittle }) => {
  return (
    <>
      <Text className="text-2xl font-semibold ml-4 mb-2 mt-5">
        {tittle}
      </Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-4"
        ListEmptyComponent={
          <View>
            <Text className="text-center mt-5">No Data Found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            key={item.id}
            className="w-[200px] border-[1px] border-zinc-300 rounded-lg overflow-hidden"
          >
            <Image source={{uri:item.image}} className='h-[150px] w-full  
             object-scale-down'/>
            <View className="p-2">

               <Text className='text-base font-semibold'>{item.title}</Text>

                <Text className='mt-1 text-zinc-500
                 text-sm' >{item.price}</Text>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default List;
