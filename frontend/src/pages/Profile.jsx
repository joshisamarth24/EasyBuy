// Profile.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import OrderSummary from '../components/OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import {toast} from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userData);
  const {token} = useSelector((state)=>state.user);
  const {orders} = useSelector((state) => state.order);
  const user = {
    name: currentUser?.username,
    photo: currentUser?.img,
    email: currentUser?.email,
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    phone: currentUser?.phone,
    address: currentUser?.addresses?.[0] ? `${currentUser?.addresses?.[0]?.street || ''}, ${currentUser?.addresses?.[0]?.city || ''}, ${currentUser?.addresses?.[0]?.state || ''}, ${currentUser?.addresses?.[0]?.postalCode || ''},${currentUser?.addresses?.[0]?.country || ''}` : 'No Address',
    addresses: currentUser?.addresses || [],
  };
  const handleUpdate = async(formData) => {
    try {
      const res = await fetch(`https://easybuy-34kz.onrender.com/api/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200){
        dispatch(updateUser(data));
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center mt-8 px-4">
        <ProfileCard user={user} onUpdate={handleUpdate} />
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Your Orders</h2>
          <ul>
            {orders.map((order, index) => (
              <OrderSummary key={order._id} order={order} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
