import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
 import { useMMKVBoolean } from 'react-native-mmkv';
import StyledView from '../components/StyledView';
const Profile = () => {
      const [isAuthenticated,setIsAuthenticated] = useMMKVBoolean('isAuthenticated');

  return (
    <StyledView>
      <View>
     <TouchableOpacity className='w-full' onPress={() => {
                 setIsAuthenticated(false);
                 }} style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, marginTop: 20 }}>
                     <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
                         LogOut
                     </Text>
                 </TouchableOpacity>
    </View>
    </StyledView>
  )
}

export default Profile

const styles = StyleSheet.create({})