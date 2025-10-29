import { ScrollView, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, Text } from 'react-native';
import { useState, useEffect } from 'react';
import List from '../../components/homepage/List';
import Categories from '../../components/homepage/Categories';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api'; 
import StyledView from '../../components/StyledView';
import Header from '../../components/Header';
import StyledText from '../../components/StyledText';
import SearchBar from '../../components/SearchBar';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);

   
      const productsParams = {
        page: 1,
        limit: 20,
        category: selectedCategory === 'All' ? undefined : selectedCategory.toLowerCase(),
        currency: '$',
      };
      const productsResponse = await api.get('/products', { params: productsParams });
      setProducts(productsResponse.data.products || []);
      
      const newProductsParams = { currency: '$' };
      const newProductsResponse = await api.get('/products/new', { params: newProductsParams });
      setNewProducts(newProductsResponse.data || []);
    } catch (error) {
      console.error("Error fetching data", error);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <StyledView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#8E6CEF" />
      </StyledView>
    );
  }

  return (
    <StyledView>
      <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      
       <Header/>

       
 
 <SearchBar/>
      
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>Categories</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate("AllCategoriesScreen")
          }}>
            <StyledText className='text-[#272727] text-xl font-medium ' value={'See All'}/> 
          </TouchableOpacity>
        </View>


        <Categories selectedCategory={selectedCategory} onSelectCategory={(cat) => setSelectedCategory(cat)} />





        {/* New Products Section */}
        <View  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
        <StyledText value={'New In'} className="text-2xl font-bold text-[#8E6CEF] ml-1 mb-4" />
          <TouchableOpacity onPress={()=>navigation.navigate('AllProductsScreen',{products:newProducts,Title:"New In"})}>
            <StyledText className='text-[#272727] text-xl font-medium ' value={'See All'}/> 
          </TouchableOpacity>



        </View>
        <List selectedCategory={selectedCategory.toLowerCase()} data={newProducts} t  />

        {/* All Products Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 12 }}>
  <StyledText value={'All Products'} className="text-2xl ml-2 font-bold text-[#1D182A]   mb-4" />

           <TouchableOpacity onPress={()=>navigation.navigate('AllProductsScreen',{products:products,Title:"All Products"})}>
            <StyledText className='text-[#272727] text-xl font-medium ' value={'See All'}/> 
          </TouchableOpacity>
        </View>
        <List selectedCategory={"all"}  data={products}   />
      </ScrollView>
    </StyledView>
  );
};

export default HomePage;