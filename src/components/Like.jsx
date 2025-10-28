// src/components/Like.jsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import HeartIcon from '../assets/icons/Blackheart.svg';
import { addToFavorites, removeFromFavorites } from '../utils/favorites';

const Like = ({
  productId,
  initialLiked = false,
  top = 0,
  right = 0,
  size = 22,
  bg = 'bg-white',
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  const toggleLike = async () => {
    const newState = !isLiked;
    setIsLiked(newState);

    if (newState) {
      const success = await addToFavorites(productId);
      if (!success) setIsLiked(false);
    } else {
      const success = await removeFromFavorites(productId);
      if (!success) setIsLiked(true);
    }
  };

  return (
    <TouchableOpacity
      onPress={toggleLike}
      className={`absolute ${bg} rounded-full p-2 shadow-sm`}
      style={{ top, right }}
    >
      <HeartIcon
        width={size}
        height={size}
        fill={isLiked ? '#8E6CEF' : 'none'}
        stroke={isLiked ? '#8E6CEF' : '#666'}
        strokeWidth={1.8}
      />
    </TouchableOpacity>
  );
};

export default Like;