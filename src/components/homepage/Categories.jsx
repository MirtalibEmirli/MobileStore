import {  FlatList, Text, TouchableOpacity } from 'react-native'
 

const Categories = ({selectedCategory, onSelectCategory}) => {

   const categories = [
  { id: 1, title: 'All' },
  { id: 2, title: 'Tech' },
  { id: 3, title: 'Sports' },
  { id: 4, title: 'Food' },
  { id: 5, title: 'Fashion' },
  { id: 6, title: 'Books' },
];

  return (
    <FlatList  showsHorizontalScrollIndicator={false} horizontal data={categories}
    contentContainerClassName="px-4 gap-3" renderItem={({item})=>(
        <TouchableOpacity onPress={()=>onSelectCategory(item.title
            
        )} key={item.id}   className={`p-2 rounded-lg min-w-6 ${
            selectedCategory === item.title ? 'bg-indigo-700' : 'bg-indigo-400'
          }`}>
            <Text  className="text-black text-lg ">{item.title}</Text>

        </TouchableOpacity>

    )}>


    </FlatList>
  )
}

export default Categories

 