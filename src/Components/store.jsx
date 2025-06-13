
import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './features/customerSlice';

export const store = configureStore({
  devTools: true, 
  reducer: {
    customer: ProductReducer
  }
});
