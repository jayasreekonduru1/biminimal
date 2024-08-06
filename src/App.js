// src/App.js
import React from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css"

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetail';
import BestSellers from './components/BestSellers';
import SkinBodyCare from './components/SkinBodyCare';
import HairCare from './components/HairCare';
import BabyCare from './components/BabyCare';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer/>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/skin-body-care" element={<SkinBodyCare />} />
          <Route path="/hair-care" element={<HairCare />} />
          <Route path="/baby-care" element={<BabyCare />} />
          <Route path="/product/:productName" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetails/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/order-details" element={<OrderDetails/>}/>
          {/* Add more routes for other pages like Shop, Bestsellers, etc. */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
