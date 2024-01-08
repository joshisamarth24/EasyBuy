import React from 'react'
import {Link} from "react-router-dom"
import styled from 'styled-components'
import { mobile } from '../responsive';

const Container = styled.div`
    flex:1;
    margin: 10px;
    height: 70vh;
    position: relative;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
    position: absolute;
    top:0;
    bottom: 0;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
`;


const CategoryItem = ({category}) => {
  return (
      <Container>
    <Link to={`/products/${category.category}`}>
        <Image src={category.img}/>
        <Info>
            <Title>{category.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
    </Link>
    </Container>
  )
}

export default CategoryItem