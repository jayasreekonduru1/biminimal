// src/components/Footer.js
import React from 'react';
import { FaInstagram } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-card">
        <h4>About Us</h4>
        <ul className='lists'>
          <li>Our values</li>
          <li>Privacy policy</li>
          <li>Terms & conditions</li>
          <li>Disclamer</li>
        </ul>
      </div>
      <div className="footer-card">
        <h4>Quick Links</h4>
        <ul className='lists'>
          <li className='list'>Shop</li>
          <li>Bestsellers</li>
          <li>Return & refund policy</li>
        </ul>
      </div>
      <div className="footer-card">
        <h4>Contact Us</h4>
        <p>Email: beminmal@skincarestore.com</p>
        <p>Phone: +1234567890</p>
        <div className='icon-container'>
        <FaInstagram size={25}/>
        <SiGmail size={25}/>
        <FaFacebookF size={25}/>
        <FaYoutube size={25}/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
