// src/redux/slices/CustomerSlice.js (better rename to ProductSlice.js)

import { createSlice } from '@reduxjs/toolkit';

let initialProduct = JSON.parse(localStorage.getItem("Product")) || [];

const initialState = initialProduct;

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.push(action.payload);
      localStorage.setItem("Product", JSON.stringify([...state]));
    },
  },
});

export const { addProduct } = ProductSlice.actions;

export default ProductSlice.reducer;
