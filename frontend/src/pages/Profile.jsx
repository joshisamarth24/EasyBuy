import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import {format} from 'timeago.js'
import { capitalize } from '@mui/material';

// Define colors, fonts, and other common styles
const colors = {
  primary: '#3498db',
  secondary: '#2ecc71',
  text: '#333',
  background: '#f8f8f8',
};

const fonts = {
  heading: 'Montserrat, sans-serif',
  text: 'Open Sans, sans-serif',
};

// Styled components with a more modern design
const FullPageWrapper = styled.div`
    height: 100vh;
  display: flex;
  flex-direction: column;
  
`;

const ProfileContainer = styled.div`
background-color: #ecf0f1;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

const ProfilePhoto = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const ProfileName = styled.h1`
  font-family: ${fonts.heading};
  font-size: 24px;
  color: ${colors.primary};
  margin: 0;
`;

const ProfileDetails = styled.div`
  padding: 20px;
`;

const ProfilePhone = styled.p`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${colors.text};
  margin: 5px 0;
`;

const ProfileAddress = styled.p`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${colors.text};
  margin: 5px 0;
`;

const ProfileOrders = styled.div`
  padding: 20px;
`;

const ProfileOrdersHeading = styled.h2`
  font-family: ${fonts.heading};
  font-size: 24px;
  color: ${colors.primary};
  margin: 0 0 10px;
`;

const ProfileOrdersList = styled.ul`

  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProfileOrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProfileOrderProduct = styled.span`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${colors.text};
`;

const ProfileOrderPrice = styled.span`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${colors.secondary};
`;
const ProfileOrderStatus = styled.span`
  font-family: ${fonts.text};
  font-size: 16px;
  color: red;
`;

const Profile = () => {
  const currentUser = useSelector(state=>state.user.currentUser?.existingUser);
  const user = {
    name: currentUser?.username,
    photo: currentUser?.profilePicture,
    phone: currentUser?.phoneNumber,
    address: currentUser?.deliveryAddress,
    orders:currentUser?.orders,
  };
let num = 1;
  return (
    <FullPageWrapper>
    <Navbar/>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileName>{capitalize(user.name)}</ProfileName>
          <ProfilePhoto src={user.photo || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt="Profile Photo" />
        </ProfileHeader>
        <ProfileDetails>
          <ProfilePhone>Phone: {user.phone}</ProfilePhone>
          <ProfileAddress>Address: {user.address}</ProfileAddress>
        </ProfileDetails>
        <ProfileOrders>
          <ProfileOrdersHeading>Your Orders</ProfileOrdersHeading>
          <ProfileOrdersList>
            {user?.orders?.map((order) => (
              <ProfileOrderItem key={order.id}>
              
                <ProfileOrderProduct>{num++}</ProfileOrderProduct>
                <ProfileOrderProduct>{order.Products?.[0]?.quantity || 1} items</ProfileOrderProduct>
                <ProfileOrderProduct>{format(order.createdAt)}</ProfileOrderProduct>
                <ProfileOrderPrice>${order.amount}</ProfileOrderPrice>
                <ProfileOrderStatus>{order.status}</ProfileOrderStatus>
              </ProfileOrderItem>
            ))}
          </ProfileOrdersList>
        </ProfileOrders>
      </ProfileContainer>
    </FullPageWrapper>
  );
};

export default Profile;
