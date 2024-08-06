// src/components/StarRating.js
import React from 'react';
import { FaStar, FaRegStar } from "react-icons/fa";
//import './StarRating.css';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStars - filledStars;

  return (
    <>
      {[...Array(filledStars)].map((_, index) => (
        <FaStar size={20} key={index} className="filled-star" />
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar size={20} key={index} className="empty-star" />
      ))}
    </>
  );
};

export default StarRating;
