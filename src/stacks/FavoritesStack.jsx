import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator();
const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritesScreen" component={Favorites} />
    </Stack.Navigator>
  )
}

export default FavoritesStack

const styles = StyleSheet.create({})