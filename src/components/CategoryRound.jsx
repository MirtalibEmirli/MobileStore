import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { SvgUri } from 'react-native-svg';

const CategoryRound = ({ imageSource, categoryName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center'
    , marginHorizontal: 12 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40, // Round shape
          overflow: 'hidden', // Ensures the image is clipped to the round shape
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f3f3f3', // Background color in case image fails to load
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
<Svg width="80" height="80" viewBox="0 0 24 24">
          <Path
            d={imageSource} // SVG path data (requires preprocessing or custom SVG component)
   
          />
        </Svg> 
        
        
             </View>
      <Text style={{ marginTop: 8, fontSize: 14, fontWeight: '500', color: '#374151' }}>
        {categoryName}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryRound;
