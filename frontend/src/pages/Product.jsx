import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from "../components/Navbar"
import Announcements from "../components/Announcements"
import NewsLetter from "../components/NewsLetter"
import Footer from '../components/Footer';
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addProduct } from '../redux/cartSlice'
import { addToCart } from '../redux/userSlice';


const Container = styled.div`

`;
const Wrapper = styled.div`
  display: flex;
  height:100%;
  justify-content: center;
  padding:40px;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  `;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
 font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.p`
font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product,setProduct] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [color,setColor] = useState("");  
  const [size,setSize] = useState("");
  const dispatch = useDispatch();

  // const handleClick = ()=>{
  //   dispatch(addProduct({...product,quantity,color,size,price:product.price}));
  // }

  const handleQuantity = (type) => {
    if(type === "dec" && quantity>1){
      setQuantity(quantity-1);
    }
    else if(type === "inc"){
      setQuantity(quantity+1);
    }
  }
  const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.existingUser;
  const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token;
  
  // ...

  const handleClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          userId: user._id,
          cartItems: [{ ...product, quantity, color, size }]
        },
        {
          headers: {
            token: `Bearer ${TOKEN}`
          }
        }
      );
      dispatch(addToCart({ ...product, quantity, color, size }));
      // Handle success
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getProduct();
  }, [id]);


  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>{product.desc}</Desc>
                <Price>{product.price}</Price>
                <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c)=>(<FilterColor onClick={()=>setColor(c)} color={c} />))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map((s)=>(<FilterSizeOption>{s}</FilterSizeOption>))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
            <Button>BUY NOW</Button>
          </AddContainer>
            </InfoContainer>
        </Wrapper>
        <NewsLetter/>
        <Footer/>
    </Container>

  )
}

export default Product