import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from '@mui/material';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { clearCart } from '../redux/cartSlice';
import { clearOrders } from '../redux/orderSlice';
import Modal from './Modal';

const Navbar = () => {
  const user = useSelector((state) => state.user?.userData);
  const { token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantity = cart?.totalQuantity;
  

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      let res = await fetch(`https://easybuy-34kz.onrender.com/api/cart/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Products: cart?.items, totalQuantity: cart?.totalQuantity, totalPrice: cart?.totalPrice}),
      });
      if (res.status === 200) {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearOrders());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogo = () => {
    window.location.replace('/');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.replace(`/search?query=${searchTerm}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const defaultUserProfile = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

  return (
    <nav className="h-16 flex items-center justify-between px-6 sm:px-4 bg-white shadow-sm w-full z-10">
      <div className="flex items-center cursor-pointer" onClick={handleLogo}>
        <Logo />
      </div>
      <div className="hidden sm:flex-1 sm:flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchOutlinedIcon 
            className="absolute left-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="flex items-center">
        {user && (
          <div className="flex items-center cursor-pointer mr-2" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        )}
        {user ? (
          <Link to="/profile" className="flex items-center mr-2">
            <img src={user?.img ? user?.img : defaultUserProfile} alt="Profile" className="w-10 h-10 rounded-full" />
            <span className="text-lg ml-2">{user?.firstName}</span>
          </Link>
        ) : (
          <div className="flex items-center space-x-4 mr-2">
            <button onClick={openModal} className="text-lg hover:text-blue-500">Register / Sign In</button>
          </div>
        )}
        {!user && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        {user && (
          <Link to="/cart" className="flex items-center mr-1">
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
