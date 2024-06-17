import React, { useState } from 'react';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addItem, decreaseQuantity, removeItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartProduct = ({ product, handleRemoveItem }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const dispatch = useDispatch();
  const handleAdd = () => {
    setQuantity(quantity + 1);
    dispatch(addItem({...product,quantity:1}));
  };
  const handleRemove = () =>{
    if(quantity>=1){
      dispatch(decreaseQuantity(product._id));
      setQuantity(quantity - 1);
    }
  }
  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc") {
      setQuantity(quantity + 1);
    }
  }
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-5 border-b pb-5">
      <Link to={`/product/${product._id}`} className="flex-1">
      <div className="flex flex-1 items-center">
        <img className="w-24 md:w-40" src={product.img} alt={product.title} />
        <div className="p-5 flex flex-col justify-around">
          <span className="font-semibold text-lg">{product.title}</span>
          <span className="text-gray-500">{product.desc}</span>
          {product?.color?.length>0 && <div className="w-5 h-5 rounded-full mt-2" style={{ backgroundColor: product?.color[0] }}></div>}
          {product?.size?.length>0 && <span className="text-gray-500">Size: {product?.size[0]}</span>}
        </div>
      </div>
      </Link>
      <div className="flex flex-1 flex-col items-center md:flex-row md:justify-end">
        <div className="flex items-center mb-5 md:mb-0 md:mr-5">
          <button className="p-2" onClick={handleAdd}>
            <Add />
          </button>
          <div className="text-2xl mx-1.5">{quantity}</div>
          <button className="p-2" onClick={handleRemove}>
            <Remove />
          </button>
        </div>
        <div className="text-2xl font-light mb-5 md:mb-0 md:mr-5">&#8377; {(product.price * product.quantity).toFixed(2)}</div>
        <button
          className="p-2 text-red-500 hover:text-red-700"
          onClick={() => handleRemoveItem(product._id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
