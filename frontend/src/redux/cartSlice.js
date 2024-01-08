import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.products.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
                state.total += action.payload.price * action.payload.quantity;
            } else {
                state.products.push(action.payload);
                state.quantity++;
                state.total += action.payload.price * action.payload.quantity;
            }
        },
    },
});


export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;