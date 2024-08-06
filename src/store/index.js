// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
//import reviewsReducer from '../features/reviews/reviewsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import concernsReducer from '../features/concerns/concernsSlice';
import cartReducer from '../features/cart/cartSlice';
import blogsReducer from '../features/blogs/blogsSlice';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    //reviews: reviewsReducer,
    categories: categoriesReducer,
    concerns: concernsReducer,
    cart: cartReducer,
    blogs:blogsReducer,
    auth: authReducer,
    order:orderReducer
    // Add more reducers here as needed.
  },
});
