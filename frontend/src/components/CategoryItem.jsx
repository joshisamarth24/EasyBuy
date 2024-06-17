import React from 'react';
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="flex-1 m-2 h-[70vh] relative group overflow-hidden rounded-lg shadow-lg">
      <Link to={`/products/${category.name}`}>
        <img 
          src={category.img} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt={category.name} 
        />
        <div className="absolute top-0 bottom-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center transition-opacity duration-500 group-hover:opacity-70">
          <h1 className="text-white text-3xl font-bold mb-5">{category.name}</h1>
          <button className="border-none py-2 px-4 bg-white text-gray-700 cursor-pointer font-semibold rounded-lg shadow-md transition-transform duration-500 hover:bg-gray-200 hover:scale-105">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItem;
