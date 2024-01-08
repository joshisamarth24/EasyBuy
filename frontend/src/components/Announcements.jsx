import React from 'react'
import styled from 'styled-components';



const Container = styled.div`
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3498db; /* Light gray background color */
    color: #ffffff; /* Dark text color */
    font-size: 16px;
`;


const Announcements = () => {
  return (
    <Container>Super Deal! Free Shipping on Orders Over $50</Container>
  )
}

export default Announcements