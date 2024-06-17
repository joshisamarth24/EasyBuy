import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ProfileCard = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const {token} = useSelector((state)=>state.user);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    photo: '',
  });

  const handleImageUpload = async (e)=>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      if(reader.readyState === 2){
        uploadImage(reader.result);
      }
    }
    
  }
  const uploadImage = async(img)=>{
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/drt9c7qcn/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: img,
          upload_preset: 'EasyBuy',
        }),
      });
      const data = await res.json();
    
      setUploadedImage(data.secure_url);
      
    } catch (error) {
      console.log(error);
      toast.error("Error uploading image, please try again later.")
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    onUpdate({...formData, photo: uploadedImage});
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
      {isEditing ? (
        <>
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Update Your Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Profile Photo URL</label>
              <input
                type="file"
                name="photo"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Update
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-blue-500">{user.name}</h1>
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              src={user.photo || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
              alt="Profile Photo"
            />
          </div>
          <div className="mb-6">
            <p className="text-xl text-gray-700 mb-2"><strong>First Name:</strong> {user.firstName}</p>
            <p className="text-xl text-gray-700 mb-2"><strong>Last Name:</strong> {user.lastName}</p>
            <p className="text-xl text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-xl text-gray-700 mb-2"><strong>Phone:</strong> {user.phone}</p>
            <p className="text-xl text-gray-700"><strong>Address:</strong> {user.address}</p>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Update Details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
