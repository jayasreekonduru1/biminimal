// src/components/Reviews.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../features/reviews/reviewsSlice';
import './Reviews.css';

const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>
      <div className="reviews-carousel">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <h3>{review.name}</h3>
            <p>{review.review}</p>
            <span>{'⭐'.repeat(review.rating)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
