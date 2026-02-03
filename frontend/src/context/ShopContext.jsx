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

  const GetCartCount = () => {
    let count = 0;
    for (let item in cartItems) {
      for (let size in cartItems[item]) {
        count += cartItems[item][size];
      }
    }
    return count;
  };

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
    GetCartCount,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
