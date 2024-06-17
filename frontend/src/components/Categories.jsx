import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

const TopCategories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () =>{
    try {
      const res = await fetch('https://easybuy-34kz.onrender.com/api/category/allCategories');
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);
  

  return (
    <div className="my-5 flex flex-col">
      <h1 className="mt-7 font-bold text-4xl ml-9 text-gray-800 font-sans">
        Top Categories
      </h1>
      <div className="mt-1 flex flex-wrap p-2 sm:p-6 sm:flex-row flex-col">
        {categories?.slice(0,4).map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
