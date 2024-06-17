import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Product from "./Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/category/allCategories"
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <h1 className="font-bold font-montserrat text-4xl ml-8 text-[#2c3e50]">
        All Categories
      </h1>
      <div className="p-8">
        <Slider {...settings}>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
        </Slider>
      </div>
    </>
  );
};

export default Categories;
