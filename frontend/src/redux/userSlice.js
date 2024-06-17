import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: JSON.parse(localStorage.getItem('user')) || null,
        token:JSON.parse(localStorage.getItem('token')) || null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.userData = action.payload.user;
            state.token = action.payload.token;
            state.isFetching = false;
            state.error = false;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            
        },
        loginFailure: (state) => {
            state.userData = null;
            state.token = null;
            state.isFetching = false;
            state.error = true;
        },
        registerStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess: (state, action) => {
            state.userData = action.payload.user;
            state.token = action.payload.token;
            state.isFetching = false;
            state.error = false;
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('token', JSON.stringify(action.payload.token));
        },
        registerFailure: (state) => {
            state.userData = null;
            state.token = null;
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.userData = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
        addAddress: (state, action) => {
            state.userData.addresses.push(action.payload);
        },
        updateUser: (state, action) => {
            state.userData = action.payload;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logout,
    addAddress,
    updateUser,
} = userSlice.actions;

export default userSlice.reducer;
