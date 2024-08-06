// src/components/HairCare.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const HairCare = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handleAddToCart = (product) => { 
    dispatch(addToCart(product));
    navigate("/cart");
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const hairCareProducts = products.filter(product => product.category === 'Hair Care');

  if (status === 'loading') return <p>Loading hair care products...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="hair-care-products">
      <h2 className='text-center pt-4 fw-bold'>Hair Care</h2>
      <div className="product-list d-flex ">
        {hairCareProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.name}`} className="product-image-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
            </Link>
            <p className='product-short-description'>{product.shortDescription}</p>
            <div className="product-rating">
              <StarRating rating={product.rating} />
            </div>
            <p className="product-price">₹ {product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="cartButton">
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HairCare;
