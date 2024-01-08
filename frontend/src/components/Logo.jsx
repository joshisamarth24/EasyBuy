// Logo.js
import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: #3498db; /* Modern blue color */
  text-shadow: 0 0 10px rgba(52, 152, 219, 0.1); /* Adjust the shadow color and intensity */
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoText>EasyBuy</LogoText>
    </LogoContainer>
  );
};

export default Logo;
