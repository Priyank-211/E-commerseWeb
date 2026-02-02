import { createContext, useState, useEffect } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currrency = '$';
  const delivery_Fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const Addtocart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select a size before adding to cart');
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const value = {
    products,
    currrency,
    delivery_Fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    Addtocart,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
