import React from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { useState } from 'react';
import { assets } from '../assets/assets.js';
import Title from '../components/Title.jsx';
import { useEffect } from 'react';
import Productitem from '../components/Productitem.jsx';
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [Subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setcategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (Subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFiltres = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }
    if (Subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Subcategory.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  };
  const sortProduct = () => {
    let fpCop = filterProducts.slice();
    // sorting logic here
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCop.sort((a, b) => a.price - b.price));

        break;
      case 'high-low':
        setFilterProducts(fpCop.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFiltres();
        break;
    }
  };

  useEffect(() => {
    applyFiltres();
  }, [category, Subcategory, search, showSearch]);
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          Filters
          <img
            onClick={() => setshowFilter(!showFilter)}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category filter */}
        <div
          className={`border border-gray-300  pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Men'}
                onChange={toggleCategory}
              />
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Women'}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Kids'}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        <div
          className={`border border-gray-300  pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Topwear'}
                onChange={toggleSubCategory}
              />
              Top Wear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Bottomwear'}
                onChange={toggleSubCategory}
              />
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                name="category"
                value={'Winterwear'}
                onChange={toggleSubCategory}
              />
              Winter Wear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side  */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTION'} />
          {/* Product Sort  */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by:Relevant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <Productitem
              key={index}
              name={item.name}
              image={item.image}
              price={item.price}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
