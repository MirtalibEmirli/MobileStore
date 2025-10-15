import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import api from  "../../utils/axios"
import { setRefreshToken, setToken } from '../../utils/store'
import StyledText from '../../components/StyledText'
import { TextInput } from 'react-native'
import Eye from '../../assets/icons/eye.svg'
import EyeOff from '../../assets/icons/Eyeoff.svg'
const Login = () => {

  const [formData, setFormData] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const handleInput=(text,type)=>{
  setFormData(prevState=>({
    ...prevState,
    [type]:text
  }))     

  }
   

const handleLogin = async() =>{
  try {
     const {data} = await  api.post('/auth/login',formData);
     setToken(data.accessToken);
     setRefreshToken(data.refreshToken)
      console.log(data);
  } 
  catch (error) {
    console.error('Login error:',error);
  }
}


 
 return (
    <View className="flex-1 justify-center items-center">

      <StyledText value={"Login"} className={"text-xl text-black font-medium"}/>
      <TextInput placeholder='Enter email ' className="border-2 font-orbitron-semibold border-gray-500 w-[350px] pl-4 mt-4" onChangeText={(text) => {
        handleInput(text, 'email')
      }}/>

      <View className="border-2  border-gray-700 w-[350px] pl-4 mt-4  relative">
      <TextInput onChangeText={(text) => {
        handleInput(text,"password")
      }} secureTextEntry ={!showPassword} placeholder="Enter password" className="w-[350px] pl-4  font-orbitron-semibold"/>
    
      <TouchableOpacity onPress={()=>{setShowPassword(prevState=>!prevState)}} className="absolute right-4 top-2" >
        {showPassword?<EyeOff  />:<Eye />}
      </TouchableOpacity>
  </View>
      <TouchableOpacity   className="w-full bg-blue-700 px-5 py-5 mt-5 " onPress={() => {handleLogin()}}>
      <StyledText value={"Submit"} className={"text-lg font-orbitron-semibold  text-center"}></StyledText>
      </TouchableOpacity>
    </View>
  )   }


 

export default Login

// const styles = StyleSheet.create({})