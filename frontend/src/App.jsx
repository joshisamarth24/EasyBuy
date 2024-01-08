import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from './pages/Home'
import Product from './pages/Product'
import ProductList from "./pages/ProductList"
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Success from './pages/Success';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Profile from './pages/Profile';

const App = () => {
  const  {currentUser}  = useSelector(state => state.user);
  console.log(currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/profile" element={<Profile />} />
        {currentUser ?  <Route path="/" element={<Home />} /> : <Route path="/login" element={<Login />} />}
        {currentUser ?  <Route path="/" element={<Home />} /> : <Route path="/register" element={<Register />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
