import {  FlatList, Text, TouchableOpacity } from 'react-native'
 

const Categories = () => {

   const categories = [
  { id: 1, title: 'All' },
  { id: 2, title: 'Tech' },
  { id: 3, title: 'Sports' },
  { id: 4, title: 'Food' },
  { id: 5, title: 'Fashion' },
  { id: 6, title: 'Books' },
];

  return (
    <FlatList showsHorizontalScrollIndicator={false} horizontal data={categories}
    contentContainerClassName="px-4 gap-3" renderItem={({item})=>(
        <TouchableOpacity key={item.id} className="bg-indigo-400 p-2 rounded-lg min-w-6
         ">
            <Text  className="text-black text-lg ">{item.title}</Text>

        </TouchableOpacity>

    )}>


    </FlatList>
  )
}

export default Categories

 