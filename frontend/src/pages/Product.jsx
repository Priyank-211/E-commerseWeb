import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';

const Product = () => {
  const { productId } = useParams();
  const { products, currrency } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState('');
  const [size, setsize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setproductdata(item);
        setimage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productdata ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal">
            {productdata.image.map((item, index) => (
              <img
                onClick={() => setimage(item)}
                src={item}
                key={index}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2 ">{productdata.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currrency}
            {productdata.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productdata.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productdata.sizes.map((item, index) => (
                <button
                  onClick={() => setsize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${size === item ? 'border-orange-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
};

export default Product;
