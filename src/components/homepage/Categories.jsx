import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import Vol from '../../assets/icons/volleyball.svg';
import PlugZap from '../../assets/icons/plug-zap.svg';
import Shirt from '../../assets/icons/shirt.svg';
import Sofa from '../../assets/icons/sofa.svg';
import BookCopy from '../../assets/icons/book-copy.svg';

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
      
    { name: 'All', component: Vol },
    { name: 'Sports', component: Vol },
    { name: 'Electronics', component: PlugZap },
    { name: 'Clothing', component: Shirt },
    { name: 'Furniture', component: Sofa },
    { name: 'Books', component: BookCopy },
  ];

  return (
    <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 10 }}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            onPress={() => onSelectCategory(category.name)}
            style={{
              marginRight: 12,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: 20,
              backgroundColor: selectedCategory === category.name ? '#8E6CEF' : '#F9FAFB',
              alignItems: 'center', // Center the content horizontally
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f3f3',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <category.component width="70" height="70"   />  
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;