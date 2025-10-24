import { View, TouchableOpacity } from 'react-native';
import Logo from '../assets/icons/LogoS.svg';
import CartIcon from '../assets/icons/Cart.svg';

const Header = () => {
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: 16, 
 
 
 
 
 
      elevation: 3 
    }}>
      <Logo width={80} height={32} />
      <TouchableOpacity>
        <CartIcon width={45} height={45} color="#8E6CEF" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;