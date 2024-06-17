import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcements';
import Products from '../components/Products';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleChange = (e) => {
    setFilters({
      ...filters, [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Navbar />
      {/* <Announcements /> */}
      <h1 className="m-5 text-4xl">{decodeURIComponent(cat)}</h1>
      <div className="flex justify-between m-5">
        <div className="m-5">
          <span className="text-xl font-semibold mr-5">Filter Products:</span>
          <select name="color" className="p-2.5 mr-5" onChange={handleChange}>
            <option disabled>Color</option>
            <option>White</option>
            <option>Black</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Yellow</option>
            <option>Green</option>
          </select>
        
        </div>
        <div className="m-5">
          <span className="text-xl font-semibold mr-5">Sort Products:</span>
          <select className="p-2.5" onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </div>
  );
};

export default ProductList;
