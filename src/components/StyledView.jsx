import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'
 
const StyledView = ({children}) => {
    const [darkmode,setDarkmode]=useMMKVBoolean('darkmode')

  return (
    <View className={`flex-1 ${darkmode?'bg-black':'bg-white'}`}>
      {children}
    </View>
  )
}

export default StyledView

const styles = StyleSheet.create({})