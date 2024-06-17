import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.Products || [];
      
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      
      const existingItem = state.items.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.price * newItem.quantity;
      } else {
        state.items.push({
          ...newItem,
          totalPrice: newItem.price * newItem.quantity,
        });
      }
      state.totalQuantity += newItem.quantity;
      state.totalPrice += newItem.price * newItem.quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item._id !== id);
        }
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item._id !== id);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, clearCart, setCart,decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
