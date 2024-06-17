import React from 'react';
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcements';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';
import TopCategories from '../components/TopCategories';
import Header from '../components/Header';

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Categories />
      <TopCategories />
      <Products />
      <div className="bg-gray-200">
        <Footer />
      </div>
    </>
  );
};

export default Home;
