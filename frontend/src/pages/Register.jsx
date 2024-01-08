import React, { useState } from 'react';
import styled from 'styled-components';
import { publicRequest } from '../api';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ecf0f1;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  height: 50%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  margin: 0 auto;
  background-color: #3498db;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
    name: '',
    lastName: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await publicRequest.post('/auth/register', user);
      if(res.status === 201){
        window.location.replace('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="name"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
          <Input
            placeholder="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <Input
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            placeholder="address"
            name="address"
            value={user.address}
            onChange={handleChange}
          />
          <Input
            placeholder="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <Input
            type="file"
            accept="image/*"
            placeholder="profile picture"
            name="profilePicture"
            value={user.profilePicture}
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
