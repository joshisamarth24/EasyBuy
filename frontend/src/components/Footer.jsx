import React from 'react';
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="flex bg-gray-200 flex-col sm:flex-row">
      <div className="flex-1 flex flex-col p-5">
        <Logo />
        <p className="my-5">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className="flex">
          <div className="w-10 h-10 rounded-full bg-[#3B5999] text-white flex items-center justify-center mr-5">
            <FacebookOutlinedIcon />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E4405F] text-white flex items-center justify-center mr-5">
            <FacebookOutlinedIcon />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#55ACEE] text-white flex items-center justify-center mr-5">
            <FacebookOutlinedIcon />
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E60023] text-white flex items-center justify-center">
            <FacebookOutlinedIcon />
          </div>
        </div>
      </div>
      <div className="flex-1 p-5 hidden sm:block">
        <h3 className="mb-7">Useful Links</h3>
        <ul className="m-0 p-0 list-none flex flex-wrap">
          <li className="w-1/2 mb-2">Home</li>
          <li className="w-1/2 mb-2">Cart</li>
          <li className="w-1/2 mb-2">Man Fashion</li>
          <li className="w-1/2 mb-2">Woman Fashion</li>
          <li className="w-1/2 mb-2">Accessories</li>
          <li className="w-1/2 mb-2">My Account</li>
          <li className="w-1/2 mb-2">Order Tracking</li>
          <li className="w-1/2 mb-2">Wishlist</li>
          <li className="w-1/2 mb-2">Terms</li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        <h3 className="mb-7">Contact</h3>
        <div className="mb-5 flex items-center">
          <LocationOnOutlinedIcon className="mr-2" /> 015 Best Street, South World 123000
        </div>
        <div className="mb-5 flex items-center">
          <LocalPhoneOutlinedIcon className="mr-2" /> +1 234 56 78
        </div>
        <div className="mb-5 flex items-center">
          <MailOutlinedIcon className="mr-2" /> contact@easybuy.com
        </div>
        <img className="w-1/2" src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment methods" />
      </div>
    </div>
  );
};

export default Footer;
