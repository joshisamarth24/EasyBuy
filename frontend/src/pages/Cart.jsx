import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar';
import Announcements from '../components/Announcements';
import Newsletter from '../components/NewsLetter';
import Footer from '../components/Footer';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import {publicRequest, userRequest} from "../api"
import { useNavigate } from 'react-router-dom';
import {STRIPE_KEY} from "..//../constants"
import StripeCheckout from 'react-stripe-checkout';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { removeFromCart } from '../redux/userSlice';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  cursor: ${(props)=>props.disabled? 'not-allowed' : 'pointer'};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: ${(props)=>props.disabled? 'not-allowed' : 'pointer'};
`;

const Cart = () => {
  const {userCart} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const line_items = [];

  userCart?.products?.map((product) => {
    line_items.push({ price_data:{
      currency: 'inr',
      product_data: {
          name: product.title,
      },
      unit_amount: (product.price*product.quantity*100),
  },  quantity: 1 });
  });
  
  const createCheckoutSession = async (line_items) => {
    try {

      const res = await axios.post('http://localhost:5000/api/checkout/create-checkout-session', {line_items});
      window.location.replace(res.data);

    } catch (error) {
      console.log(error);
    }
  }
  const handleRemoveItem = (id)=>{
    dispatch(removeFromCart(id));
  }
  const handleContinue = ()=>{
    window.location.replace('/');
  }

  return (
    <Container>
      <Navbar />
      <Announcements />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleContinue}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({userCart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={()=>userCart && createCheckoutSession(line_items)} disabled={userCart.quantity === 0}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {userCart?.products?.map((product)=>(<Product>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor color={product.color} />
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
              <DeleteIcon style={{cursor:'pointer',color:'red'}} onClick={() => handleRemoveItem(product._id)} />
            </Product>))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {userCart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {userCart.total}</SummaryItemPrice>
            </SummaryItem>
            
              <Button disabled={userCart.quantity === 0} onClick={()=>userCart && createCheckoutSession(line_items)}>CHECKOUT NOW</Button>
            
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;