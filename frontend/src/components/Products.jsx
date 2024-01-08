import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";


const Container = styled.div`
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Heading = styled.h1`
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    margin-left: 30px;
    color: #2c3e50;
`; 

const Products = ({cat,filters,sort}) => {
  const [products,setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);

  const getProducts = async()=>{
    try {
      const res = await axios.get(
        cat?`http://localhost:5000/api/products/?category=${cat}`:
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProducts();
  },[cat]);

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

  useEffect(()=>{
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
  },[sort]);
  

  return (
    <>
    <Heading>TRENDING PRODUCTS</Heading>
        <Container>

      {cat ? filteredProducts?.map((item)=>(<Product item={item} key={item.id} />)):
        products.slice(0,10)?.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
    </>
  );
};

export default Products;