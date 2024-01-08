import React from 'react'
import styled from 'styled-components'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Logo from "./Logo"
import { Link } from 'react-router-dom';
import { Badge, capitalize } from '@mui/material';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../redux/userSlice';

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    
    align-items: center;
    ${mobile({ padding: "10px 0px" })}

`;
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;
const Language = styled.span`
    font-size: 18px;
    font-weight: 2rem;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
    border: 0.5px solid #bdc3c7;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border:none;
    outline: none;
    font-size: 22px;
    ${mobile({ width: "50px" })}
`;


const Center = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const ProfileSection = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: 10px;
`;
const UserProfile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;`;
const Navbar = () => {
    const dispatch = useDispatch();
    const handleLogout = ()=>{
        dispatch(logout());
        window.location.replace('/');
    }
    const handleLogo=()=>{
       
            window.location.replace('/');
        
    }
    const user = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)?.currentUser?.existingUser;
    const quantity = useSelector(state=>state.user.userCart.quantity);
    const defaultUserProfile = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="Search"></Input>
                    <SearchOutlinedIcon style={{ color: "gray", fontSize: 20, cursor: 'pointer' }} />
                </SearchContainer>
            </Left>
            <Center onClick={handleLogo}>
                <Logo />
            </Center>
            <Right>
            {user && <MenuItem style={{ transform: 'rotateY(180deg)',marginRight:'15px',cursor:'pointer' }} onClick={handleLogout}><LogoutIcon/></MenuItem>}
                {user ? (
                        <Link to='/profile' style={{ textDecoration: 'none' }}>
                    <ProfileSection>
                        {/* Render user profile pic and username */}
                        <UserProfile>
                            <img src={user.profilePicture?user.profilePicture:defaultUserProfile} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                        </UserProfile>
                        <MenuItem style={{marginLeft:'5px'}}>{capitalize(user.username)}</MenuItem>
                    </ProfileSection>
                        </Link>
                ) : (
                    <ProfileSection>
                        {/* Render register and sign in */}
                        <Link to='/register' style={{ textDecoration: 'none' }}>
                            <MenuItem>REGISTER</MenuItem>
                        </Link>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <MenuItem>SIGN IN</MenuItem>
                        </Link>
                    </ProfileSection>
                )}
                <Link to='/cart'>
                    <MenuItem>
                        <Badge badgeContent={quantity} color='primary'>
                            <ShoppingCartOutlinedIcon />
                        </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
);
}

export default Navbar