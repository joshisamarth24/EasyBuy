import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcements';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';

const Wrapper = styled.div`
  background-color: #ecf0f1;
`;
const Home = () => {
  return (
    <>
    <Navbar/>
    <Announcements/>
    <Slider/>
    <Categories/>
    <Products/>
    <Wrapper>
    <Newsletter/>
    <Footer/>
    </Wrapper>
    </>
  )
}

export default Home