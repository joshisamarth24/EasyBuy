import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Product from "./Product";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        cat
          ? `https://easybuy-34kz.onrender.com/api/products/allProducts?category=${cat}`
          :
        "https://easybuy-34kz.onrender.com/api/products/allProducts"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

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
      {cat ? <h1 className="font-bold font-montserrat text-4xl ml-8 text-[#2c3e50]">{cat}</h1>
      : <h1 className="font-bold font-montserrat text-4xl ml-8 text-[#2c3e50]">
        TRENDING PRODUCTS
      </h1>}
      <div className="p-8 mb-20">
        <Slider {...settings}>
          {cat
            ? filteredProducts?.map((item) => (
                <Product item={item} key={item._id} />
              ))
            : products.slice(0, 10)?.map((item) => (
                <Product item={item} key={item.id} />
              ))}
        </Slider>
      </div>
    </>
  );
};

export default Products;
