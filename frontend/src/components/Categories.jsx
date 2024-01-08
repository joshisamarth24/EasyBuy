import React from 'react'
import styled from 'styled-components'
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { mobile } from '../responsive';

const Container = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    ${mobile({ padding: "0px", flexDirection:"column" })}
    
`;
const Heading = styled.h1`
    margin-top: 30px;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    margin-left: 35px;
    color: #2c3e50;
    ${mobile({ fontSize:'20px' })}
`; 
const Wrapper = styled.div`
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 30px 30px 30px;
    ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = () => {
  return (
    <Container>
        <Heading>SHOP BY CATEGORY</Heading>
        <Wrapper>
        {categories.map((category)=>{
            return (
                <CategoryItem key={category.id} category={category}/>
            )
        })}
        </Wrapper>
        
    </Container>
  )
}

export default Categories