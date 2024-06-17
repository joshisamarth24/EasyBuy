import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from './pages/Home'
import Product from './pages/Product'
import ProductList from "./pages/ProductList"
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast';
import Success from './pages/Success';
import { useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import SearchResults from './pages/SearchResults';

const App = () => {
  const user = useSelector(state => state.user.userData);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user? <Navigate to="/"/> :<Register/>} />
        <Route path="/products/:category" element={!user? <Navigate to="/"/> :<ProductList />} />
        <Route path="/product/:id" element={!user? <Navigate to="/"/> :<Product />} />
        <Route path="/cart" element={!user? <Navigate to="/"/> :<Cart />} />
        <Route path="/success" element={!user? <Navigate to="/"/> :<Success />} />
        <Route path="/profile" element={!user? <Navigate to="/"/> :<Profile />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
