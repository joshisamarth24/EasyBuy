import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import { addOrder } from '../redux/orderSlice';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const address = useSelector((state)=>state.order.OrderAddress)
  const currentUser = useSelector((state) => state.user?.userData);
  const {token} = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const [Products, setProducts] = useState({
    items: [],
  });

  useEffect(() => {
    cart?.items?.map((item) => {
      setProducts((prev) => ({
        items: [
          ...prev.items,
          {
            ProductId: item,
            Quantity: item.quantity,
          },
        ],
      }));
    });
  }, [cart?.items]);



  const updateCart = async () => {
    try {
      const res = await fetch(`https://easybuy-34kz.onrender.com/api/cart/update/${currentUser?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: [] }),
      });
      
    } catch (error) {
      console.log(error)
    }
  };

  const createOrder = async () => {
    try {
      const res = await axios.post('https://easybuy-34kz.onrender.com/api/orders/placeOrder', {
        userId: currentUser?._id,
        products: cart?.items?.map((item) => ({ ProductId: item._id, quantity: item.quantity })),
        amount: cart?.totalPrice,
        address: address || {
          street: "1234 Elm Street",
          city: "Springfield",
          state: "IL",
          postalCode: "62704",
          country: "US"
        },
      });
      if(res.status === 200){
        setOrderId(res.data.newOrder?._id);
        dispatch(addOrder(res.data.newOrder));
        dispatch(clearCart());
        updateCart();
        toast.success('Order placed successfully');
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to create order');
      navigate('/');
      console.error('Failed to create order:', error);
    }
  };

  useEffect(() => {
    if(address){
      createOrder();
    }
  }, [address]);

  const goToHomepage = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      {orderId ? (
        <p className="text-lg text-center text-green-600">
          Order has been created successfully. Your order number is {orderId}.
        </p>
      ) : (
        <p className="text-lg text-center text-blue-600">
          Success! Your order is being prepared...
        </p>
      )}
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={goToHomepage}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
