import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import { Navigate } from 'react-router-dom';
import Announcements from "../components/Announcements";
import NewsLetter from "../components/NewsLetter";
import Footer from '../components/Footer';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem, decreaseQuantity } from '../redux/cartSlice';

const Product = () => {
  const location = useLocation();
  
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const handleQuantity = (type) => {
    if (type === "dec" && quantity >= 1) {
      dispatch(decreaseQuantity(product._id))
      setQuantity(quantity - 1);
    } else if (type === "inc") {
      dispatch(addItem({ ...product, quantity:1 }))
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    setQuantity(1);
    dispatch(addItem({ ...product,quantity:1 }));
  };

  const handleBuyNow = () => {
    if(quantity === 0) {
      setQuantity(1);
      dispatch(addItem({ ...product,quantity:1 }));
    }
    
    window.location.replace('/cart');
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/find/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      {/* <Announcements /> */}
      <div className="container mx-auto p-5 flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        <div className="flex-1">
          <img className="w-full h-auto object-cover rounded-lg" src={product.img} alt={product.title} />
        </div>
        <div className="flex-1 p-0 px-4 lg:px-12">
          <h1 className="font-light text-4xl mb-5">{product.title}</h1>
          <p className="text-gray-700 mb-5">{product.desc}</p>
          <p className="font-light text-4xl mb-5">&#8377; {product.price}</p>
          <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-10 mb-7">
           {product?.color?.length > 0 ? (<div className="flex items-center mb-5 lg:mb-0">
              <span className="text-xl font-light mr-2">Color</span>
              {product.color?.map((c) => (
                <div
                  key={c}
                  className={`w-5 h-5 rounded-full mx-1 cursor-pointer border border-gray-300 bg-[${c}]`}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>):null}
            {product?.size?.length >0 ? (<div className="flex items-center">
              <span className="text-xl font-light mr-2">Size</span>
              <select
                className="p-2 border border-gray-300 rounded"
                onChange={(e) => setSize(e.target.value)}
              >
                {product?.size?.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>):null}
          </div>
          <div className="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 space-x-0 lg:space-x-5 mb-7">
            {quantity>0 ? (<div className="flex items-center font-bold mb-5 lg:mb-0">
              <Remove className="cursor-pointer" onClick={() => handleQuantity("dec")} />
              <span className="w-8 h-8 rounded border border-teal-500 flex items-center justify-center mx-2">
                {quantity}
              </span>
              <Add className="cursor-pointer" onClick={() => handleQuantity("inc")} />
            </div>):
            (
              <button
                className="flex-1 lg:flex-none p-3 border-2 border-teal-500 bg-white cursor-pointer font-semibold hover:bg-gray-100 rounded"
                onClick={handleClick}
              >
                ADD TO CART
              </button>
             
           )}
            <button className="flex-1 lg:flex-none px-7 py-3 border-2 border-teal-500 bg-white cursor-pointer font-semibold hover:bg-gray-100 rounded"
              onClick={handleBuyNow}>
                BUY NOW
              </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
