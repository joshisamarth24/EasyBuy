import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

const preloadedState = {
  user: {
        userData: JSON.parse(localStorage.getItem('user')) || null,
        token:JSON.parse(localStorage.getItem('token')) || null,
        isFetching: false,
        error: false,
  },
  cart:JSON.parse(localStorage.getItem('cart')) || {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  order: {
    orders: JSON.parse(localStorage.getItem('orders')) || [],
    OrderAddress: JSON.parse(localStorage.getItem('orderAddress')) || {},
    isFetching: false,
    error: false,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  preloadedState,
});

export default store;
