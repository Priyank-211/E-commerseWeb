import React from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets.js';
import RelatedProduct from '../components/RelatedProduct.jsx';

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
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
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
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original Product</p>
            <p>Cash on delivery is available on this Product</p>
            <p>Easy return and exchange pollicy withinn 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & review System  */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm ">Reviews {122}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error unde
            nulla eius minima nemo. Qui, dolorem. Nam assumenda adipisci
            deserunt repudiandae iusto explicabo! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Eligendi esse a in quibusdam libero
            sunt? Aperiam, assumenda! Non repudiandae maxime et, odio nemo
            distinctio fuga, perferendis laboriosam esse qui labore.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            voluptatibus suscipit perferendis. Commodi odit, fugit dignissimos
            id soluta aspernatur. lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eligendi esse a in quibusdam libero sunt? Aperiam,
            assumenda! Non repudiandae maxime et, odio nemo distinctio fuga,
            perferendis laboriosam esse qui labore.
          </p>
        </div>
      </div>
      {/* Display related products  */}
      <RelatedProduct
        category={productdata.category}
        subcategory={productdata.subCategory}
      />
      <div></div>
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
};

export default Product;
