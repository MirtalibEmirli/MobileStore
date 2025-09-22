import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useMMKVBoolean } from 'react-native-mmkv'
const DarkModeToggle = () => {
  const [darkmode,setDarkmode]=useMMKVBoolean('darkmode')
  return (
        <TouchableOpacity className='bg-orange-500 rounded-full w-[50px]' onPress={()=>
          {setDarkmode(prevstate=>!prevstate)}}><Text className='text-center'>{darkmode?"light":"dark"}</Text></TouchableOpacity>

  )
}

export default DarkModeToggle

const styles = StyleSheet.create({})