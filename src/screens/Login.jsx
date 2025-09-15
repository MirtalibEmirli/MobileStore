import {  Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import logo from '../assets/logo.png'
const Login = () => {
    const [formdata, setFormdata] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const handleInput = (text, type) => {
        setFormdata(prevState => ({
            ...prevState,
            [type]: text
        }))
    }

    return (
        <View className='relative' style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}> 
            <Text className=' absolute top-24  font-serif   font-medium text-center text-2xl'>Welcome To our Puapp</Text>

        <Image
          className="h-24 w-24   rounded-full mb-4" 
          style={{ width: 100, height: 100 }}
          source={logo}
        />  
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Login</Text>
            <TextInput onChangeText={(text) => {
                handleInput(text, 'email')
            }} placeholder='Enter email' style={{ borderWidth: 1, borderColor: 'lightgray', width: 350, paddingLeft: 16, marginTop: 16 }} />

            <View style={{ borderWidth: 1, borderColor: 'lightgray', width: 350, marginTop: 16, position: 'relative' }}>
                <TextInput onChangeText={(text) => {
                    handleInput(text, 'password')
                }} secureTextEntry={!showPassword} placeholder='Enter password' style={{ width: 350, paddingLeft: 16 }} />
                <TouchableOpacity onPress={() => {
                    setShowPassword(prevState => !prevState)
                }} style={{ position: 'absolute', right: 16, top: 8 }}>
                    <Text>X</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity className='w-full' onPress={() => {
                console.log(formdata)
            }} style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 10, marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login