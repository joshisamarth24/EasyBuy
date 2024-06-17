import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders:JSON.parse(localStorage.getItem('orders')) || [],
        OrderAddress:JSON.parse(localStorage.getItem('orderAddress')) || {},
        isFetching:false,
        error:false,
    },
    reducers:{
        getOrdersStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrdersSuccess:(state, action) => {
            state.orders = action.payload;
            state.isFetching = false;
            state.error = false;
            localStorage.setItem('orders', JSON.stringify(action.payload));
        },
        getOrdersFailure:(state) => {
            state.isFetching = false;
            state.error = true;
        },
       addOrder:(state, action) => {
           state.orders.push(action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
       },
       setAddress:(state, action) => {
           state.OrderAddress = action.payload;
              localStorage.setItem('orderAddress', JSON.stringify(action.payload));
       },
       clearOrders:(state) => {
              state.orders = [];
              state.OrderAddress = {};
              localStorage.removeItem('orders');
         },
    },
});

export const {getOrdersStart, getOrdersSuccess, getOrdersFailure, addOrder,setAddress,clearOrders} = orderSlice.actions;
export default orderSlice.reducer;

