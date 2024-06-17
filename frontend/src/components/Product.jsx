import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem, decreaseQuantity, removeItem } from '../redux/cartSlice';

const Product = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(addItem({ ...item, quantity: 1 }));

  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    dispatch(addItem({ ...item, quantity: 1 }));
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
    dispatch(decreaseQuantity(item._id));
  };

  return (
    <div className="flex-1 m-2 min-w-[280px] h-[400px] flex flex-col items-center justify-between bg-white p-6 rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      <Link to={`/product/${item._id}`} className="w-full flex justify-center mb-4">
        <img src={item.img} alt={item.title} className="h-[220px] w-auto rounded-lg object-cover transition-transform duration-500 hover:scale-105" />
      </Link>
      <div className="flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h2>
        <p className="text-md text-gray-700 mb-4">&#8377; {item.price}</p>
        
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:cursor-not-allowed"
            disabled={user ? false : true}
            hidden={user ? false : true}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center">
            <button
              onClick={handleDecrease}
              className="bg-red-500 text-white py-2 px-4 rounded-l-full hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={user ? false : true}
              hidden={user ? false : true}
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-green-500 text-white py-2 px-4 rounded-r-full hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={user ? false : true}
              hidden={user ? false : true}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
