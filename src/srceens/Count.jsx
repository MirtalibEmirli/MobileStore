import {    Text, View ,TouchableOpacity} from 'react-native'
 import { useState } from 'react'
const Count = () => {
  const [count,setCount] = useState(0)
  return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{textAlign:'center',fontSize:20,marginTop:50,fontWeight:'400'}}>
        Count:{count} </Text>

        <TouchableOpacity onPress={()=>{setCount(count+1)}} style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:10,borderRadius:5,marginTop:20}   }>
          <Text  style={{fontSize:17,color:'white',fontWeight:'500'}}>
            Increase
          </Text>
        </TouchableOpacity>
    </View>
  )
} 

export default Count

 