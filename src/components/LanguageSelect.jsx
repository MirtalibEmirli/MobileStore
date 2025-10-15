import { StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useEffect ,useState} from 'react';
import  {languages}   from '../locales/index'
import { useTranslation } from 'react-i18next';
import { useMMKVObject } from 'react-native-mmkv';
import StyledText from './StyledText';
 
const LanguageSelect = () => {
  const [selectedLanguage, setSelectedLanguage] = useMMKVObject('selectedLanguage');
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedLanguage?.value) {
      i18n.changeLanguage(selectedLanguage.value);
    }
  }, [selectedLanguage]);
  
  return (
    <TouchableOpacity
      onPress={() => setIsOpen(true)}
      className="border-zinc-300 rounded-md bg-white relative
                 w-[100px] h-[40px] border-[1px] justify-center items-center"
    >
      <Text className="text-black font-orbitron-extra ">
        {selectedLanguage?.label ?? "Language"}
      </Text>
{
  isOpen&&(<FlatList
  data={languages} className='absolute -bottom-[60px]'
  renderItem={({item})=>(
  <TouchableOpacity onPress={()=>{
    setSelectedLanguage(item);
    setIsOpen(false);
  }}>
    <StyledText value={item.label} className={"text-lg mt-1 font-orbitron-semibold"}/>
    {/* <Text className="text-white text-lg mt-1 font-orbitron">{item.label}</Text> */}
  </TouchableOpacity>)}/>)
}
    </TouchableOpacity>
  );
};


export default LanguageSelect

const styles = StyleSheet.create({})