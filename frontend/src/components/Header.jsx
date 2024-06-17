import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Badge, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
import { clearOrders } from "../redux/orderSlice";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: '1.5rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  fallback: {
    backgroundColor: theme.palette.secondary.main,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  button: {
    height: '36px',
    padding: '0 16px',
    textTransform: 'none',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const user = useSelector((state) => state.user?.userData);
  const { token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const quantity = cart.totalQuantity;

  const handleLogout = async () => {
    try {
      let res = await fetch(`http://localhost:5000/api/cart/update/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Products: cart.items }),
      });
      if (res.status === 200) {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearOrders());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultUserProfile = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

  return (
    <header className={classes.header}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">Acme Inc</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2">
                <Avatar src={user?.img || defaultUserProfile} alt={user?.name} className={classes.avatar}>
                  {!user?.img && user?.name.charAt(0).toUpperCase()}
                </Avatar>
                <span className="text-sm font-medium">{user?.name}</span>
              </Link>
              <Link to="/cart" className="relative">
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Badge>
              </Link>
              <IconButton className={classes.iconButton} onClick={handleLogout}>
                <LogOutIcon className="h-6 w-6" />
              </IconButton>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className={classes.link}>
                <Button className={classes.button} variant="text">
                  Login
                </Button>
              </Link>
              <Link to="/register" className={classes.link}>
                <Button className={classes.button} variant="contained" color="primary">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
