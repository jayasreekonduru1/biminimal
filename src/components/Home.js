// src/components/Home.js
import React from 'react';

import Categories from './Categories';
// import banner from '../../public/assets/Home_Banner_3.avif'
import Concerns from './Concerns';
import './Home.css';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
 
  const handleBabyCareShop=()=>{
    navigate('/baby-care');
  }

  return (
    <div className="home">
      <div className='banner-new-launch'>
        <img src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/Home_Banner_3.png?v=1719577072" alt="banner"/>
        <div className='banner-text-container'>
          <h5>New Launch</h5>
          <h4>Proven Safe Baby Care</h4>
          <p>A curated range of pediatrician-approved baby care products formulated with the most sensitive skin in mind. Our hypoallergenic and dermatologically-tested line gently cleanses, soothes, protects, and nourishes your little ones</p>
          <button onClick={handleBabyCareShop}>Shop Now</button>
        </div>
      </div>
      <Categories />
      <Concerns/>

      <div className='properties-container'>
        <div className='properties-heading'>
          <h2>The future of personal care is here</h2>
          <p>Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</p>
        </div>
        <div className='properties-section'>
          <div className='property-container'>
            <img height="50px" src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/transparency.png?crop=center&height=64&v=1709367756&width=64" alt=""/>
            <h4>Transparency</h4>
            <p>Full disclosure of ingredients used & their concentration</p>
          </div>

          <div className='property-container'> 
            <img height="50px" src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/medical-research-256_1.png?v=1708782298&width=192" alt=""/>
            <h4>Efficacy</h4>
            <p>Formulations developed in our laboratories</p>
          </div>

          <div className='property-container'>
            <img height="50px" src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/download.png?crop=center&height=64&v=1709206575&width=64" alt=""/>
            <h4>Affordable</h4>
            <p>Skincare, accessible to all</p>
          </div>

          <div className='property-container'>
            <img height="50px" src="https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/globe.png?v=1709367803&width=192" alt=""/>
            <h4>Only the best</h4>
            <p>Ingredients sourced from across the world</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
