import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure, loginSuccess } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';

const Register = ({ setShowLogin, setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const { isFetching } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    firstName: '',
    lastName: '',
    role: 'user',
    phone: '',
  });

  const handleShowRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerStart());
    isFetching && toast.loading('Please wait...');
    try {
      if(user.profilePicture !== ''){
      handleImageUpload(user.profilePicture);
      }
      const res = await fetch('https://easybuy-34kz.onrender.com/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({...user, profilePicture: uploadedImage}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        dispatch(registerFailure());
      } else {
        toast.success(data.message);
        dispatch(loginSuccess({ user: data.newUser, token: data.token }));
        setShowLogin(false);
        setShowRegister(false);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      dispatch(registerFailure());
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-2xl font-light text-center mb-6">CREATE AN ACCOUNT</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <input
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4">
            <input
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-4">
            <input
              className="w-1/2 px-4 py-2 border rounded-md"
              placeholder="Phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            <input
              className="w-1/2 px-4 py-2 border rounded-md disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed text:gray-500"
              placeholder="Role"
              name="role"
              value="user"
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="relative flex items-center">
            <input
              className="w-full px-4 py-2 border rounded-md pr-10"
              placeholder="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer"
            />
          </div>
          <div className="relative flex items-center">
            <input
              className="w-full px-4 py-2 border rounded-md pr-10"
              placeholder="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={user.confirmPassword}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 cursor-pointer"
            />
          </div>
          <div className="flex space-x-4">
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="file"
              accept="image/*"
              placeholder="Profile Picture"
              name="profilePicture"
              onChange={handleImageUpload}
            />
          </div>
          <span className="block text-center text-sm mt-4">
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button
            className="w-full py-3 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
            type="submit"
          >
            CREATE
          </button>
          <div className="text-center mt-4" onClick={handleShowRegister}>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Already have an account? Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
