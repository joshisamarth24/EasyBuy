import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcements';
import Footer from '../components/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/cartSlice';
import CartProduct from '../components/CartProduct';
import { addAddress } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { setAddress } from '../redux/orderSlice';

const Cart = () => {
  const userCart = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user?.userData?._id);
  const userAddresses = useSelector((state) => state.user?.userData?.addresses);
  const dispatch = useDispatch();
 
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleAddressSelect = (address) => {
    const pattern = /^(.*),([^,]*),([^,]*),([^,]*),([^,]*),([^,]*)$/;
    const match = address.trim().match(pattern);
    setSelectedAddress(address);

    if (match) {
        let street = match[1].trim();
        let city = match[2].trim();
        // Since the city and the region might be duplicated, we handle it accordingly
        if (match[2].trim() === match[3].trim()) {
            var state = match[4].trim();
            var postalCode = match[5].trim();
            var country = match[6].trim();
        } else {
            city = `${match[2].trim()}, ${match[3].trim()}`;
            var state = match[4].trim();
            var postalCode = match[5].trim();
            var country = match[6].trim();
        }

       
        dispatch(setAddress({
            street: street,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country
        }));
    } else {
        throw new Error("Address format is incorrect");
    }

}


  const handleAddNewAddress = async() => {
    if (Object.values(newAddress).some(field => field === '')) {
      toast.error('Please fill all the address fields.');
      return;
    }
    dispatch(addAddress(newAddress));
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( {addresses: [...userAddresses,newAddress] }),
      });
    } catch (error) {
      console.log(error)
    }
    setSelectedAddress(`${newAddress.street}, ${newAddress.city}, ${newAddress.state}, ${newAddress.postalCode}, ${newAddress.country}`);
    dispatch(setAddress(newAddress));
    setAddingNewAddress(false);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
    toast.success('New address added!');
  };

  const createCheckoutSession = async () => {
    try {
      const line_items = userCart?.items?.map((product) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.title,
          },
          unit_amount: Math.round(product.price * product.quantity * 100),
        },
        quantity: product.quantity,
      }));
      const res = await axios.post('http://localhost:5000/api/checkout/create-checkout-session', { line_items });
      window.location.replace(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Navbar />
      <Announcements />
      <div className="p-5 md:p-2.5">
        <h1 className="text-2xl font-light text-center mb-5">YOUR BAG</h1>
        <div className="flex items-center justify-between p-5">
          <button className="p-2.5 font-semibold cursor-pointer bg-transparent" onClick={() => window.location.replace('/')}>CONTINUE SHOPPING</button>
          <div className="hidden md:flex">
            <span className="underline cursor-pointer mx-2.5">Shopping Bag ({userCart.totalQuantity})</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex-3">
            {userCart?.items?.map((product) => (
              <CartProduct key={product._id} product={product} handleRemoveItem={handleRemoveItem} />
            ))}
          </div>
          <div className="flex-1 border-0.5 border-gray-300 rounded-md p-5 h-50vh">
            <h1 className="text-xl font-light">ORDER SUMMARY</h1>
            <div className="my-7 flex justify-between">
              <span>Subtotal</span>
              <span>&#8377; {userCart?.totalPrice?.toFixed(2)}</span>
            </div>
            <div className="my-7 flex justify-between">
              <span>Estimated Shipping</span>
              <span>&#8377; 50</span>
            </div>
            <div className="my-7 flex justify-between">
              <span>Shipping Discount</span>
              <span>&#8377; -50</span>
            </div>
            <div className="my-7 flex justify-between font-medium text-xl">
              <span>Total</span>
              <span>&#8377; {userCart?.totalPrice.toFixed(2)}</span>
            </div>
            <div className="mb-0">
              <h2 className="text-lg font-medium mb-2">Select Shipping Address</h2>
              <select
                className="w-full p-2.5 mb-3 border rounded"
                value={selectedAddress}
                onChange={(e)=>handleAddressSelect(e.target.value)}
              >
                <option value="" disabled>Select an address</option>
                {userAddresses?.map((address, index) => (
                  <option key={index} value={address._id}>
                    {address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}
                  </option>
                ))}
              </select>
              {addingNewAddress ? (
                <div className="flex flex-col">
                  <input
                    className="p-2.5 mb-2 border rounded"
                    type="text"
                    placeholder="Street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  />
                  <input
                    className="p-2.5 mb-2 border rounded"
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                  <input
                    className="p-2.5 mb-2 border rounded"
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  />
                  <input
                    className="p-2.5 mb-2 border rounded"
                    type="text"
                    placeholder="ZIP"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  />
                  <input
                    className="p-2.5 mb-2 border rounded"
                    type="text"
                    placeholder="Country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  />
                  <div className="flex justify-center items-center mb-2">
                  <button
                    className="w-1/3 p-2.5 flex-auto m-2 bg-black text-white font-semibold cursor-pointer"
                    onClick={handleAddNewAddress}
                  >
                    ADD ADDRESS
                  </button>
                  <button
                    className="w-1/3 p-2.5 flex-auto m-2 bg-gray-300 text-black font-semibold cursor-pointer"
                    onClick={() => setAddingNewAddress(false)}
                  >
                    CANCEL
                  </button>
                  </div>
                </div>
              ) : (
                <button
                  className={`w-1/3 inline p-2.5 m-1 rounded-md bg-green-700 text-white font-semibold mb-2 ${userCart.totalQuantity === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => setAddingNewAddress(true)}
                  disabled={userCart.totalQuantity === 0}
                >
                  ADD NEW ADDRESS
                </button>
              )}
              <button
                className={`w-1/3 p-2.5 bg-black rounded-md text-white font-semibold ${userCart?.totalQuantity === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => userCart?.totalQuantity && createCheckoutSession()}
                disabled={userCart?.totalQuantity === 0}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
