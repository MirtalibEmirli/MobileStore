import {    Text  } from 'react-native'
 import { useMMKVBoolean } from 'react-native-mmkv'

const StyledText = ({value,className}) => {
  const [darkmode,setDarkmode]=useMMKVBoolean('darkmode')
  return (
           <Text className=
           {`${className} ${darkmode ? "text-white" : "text-black"}`}>{value}</Text> 

  )
}

export default StyledText

