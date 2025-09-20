import {  ScrollView, Text, TouchableOpacity } from 'react-native'
import List from '../../components/homepage/List'
import Categories from '../../components/homepage/Categories'
import Banner from '../../components/homepage/Banner'
import { useState } from 'react'
import {
  techProducts,
  sportsProducts,
  foodProducts,
  fashionProducts,
  bookProducts,
} from '../../components/homepage/data';

import DarkModeToggle from '../../components/DarkModeToggle'
import StyledView from '../../components/StyledView'
 const HomePage =()=>{
const [selectedCategory,setSelectedCategory]=useState('All')
 
 
 
    return(
      <StyledView>
          <ScrollView className={`flex-1 `}>
            <DarkModeToggle/>
            <Banner/>
            <Categories selectedCategory={selectedCategory} onSelectCategory={

setSelectedCategory
            }/>
            <List selectedCategory={selectedCategory} data={techProducts} tittle="Tech products"/>
            <List selectedCategory={selectedCategory} data={sportsProducts} tittle="Sports products"/>
            <List selectedCategory={selectedCategory} data={foodProducts
} tittle="Food products"/>
           
            <List selectedCategory={selectedCategory} data={fashionProducts} tittle="Fashion products"/>
            <List selectedCategory={selectedCategory} data={bookProducts

            } tittle="Book products"/>
        </ScrollView>
      </StyledView>
    )
}

export default HomePage