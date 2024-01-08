import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    isFetching:false,
    error:false,
    userCart:{
        products: [],
        quantity: 0,
        total: 0,
    },
    userOrder:[]
};

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser = action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.userCart = {
                products: [],
                quantity: 0,
                total: 0,
            };
            state.userOrder = [];
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.userCart.products = state.userCart.products.filter(item => item.id !== productId);
            state.userCart.quantity -= 1;
            state.userCart.total -= action.payload.price;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            state.userCart.products.push(product);
            state.userCart.quantity += 1;
            state.userCart.total += action.payload.price;
        },
        addOrder: (state, action) => {
            const order = action.payload;
            state.userCart = {
                products: [],
                quantity: 0,
                total: 0,
            };
            state.userOrder.push(order);
        },
    },
});

export const {loginStart,loginSuccess,loginFailure,addToCart,addOrder,removeFromCart,logout} = userSlice.actions;
export default userSlice.reducer;
