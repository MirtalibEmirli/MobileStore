import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../assets/icons/back-arrow.svg'
const GoBack = ({top,left ,bottom=0 }) => {
  const navigation = useNavigation()
  return (
        <TouchableOpacity
                 onPress={() => navigation.goBack()}
                 className={`absolute left-${left}  bottom-${bottom} justify-center   items-center top-${top}  bg-[#F4F4F4] w-[40px] h-[40px] rounded-[100px]`}
               >
                 <BackArrow width={40} height={40} />
               </TouchableOpacity>
  )
}

export default GoBack

const styles = StyleSheet.create({})