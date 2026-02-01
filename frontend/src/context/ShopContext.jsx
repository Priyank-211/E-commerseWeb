import { createContext, useState } from 'react';
import { products } from '../assets/assets';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currrency = '$';
  const delivery_Fee = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  const value = {
    products,
    currrency,
    delivery_Fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
