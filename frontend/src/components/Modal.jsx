import React, { useState } from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';


const Modal = ({ isOpen, onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center w-full justify-center overflow-x-hidden overflow-y-auto bg-gray-300 bg-opacity-75">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          {showLogin && <Login className="w-full" setShowLogin={setShowLogin} setShowRegister={setShowRegister} />}
          {showRegister && <Register setShowLogin={setShowLogin} setShowRegister={setShowRegister} />}
        </div>
        </div>
      </div>
 
  );
};

export default Modal;
