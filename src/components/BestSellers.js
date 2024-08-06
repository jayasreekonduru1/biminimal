// src/components/BestSellers.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const BestSellers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const handleAddToCart = (product) => { 
    dispatch(addToCart(product));
    navigate("/cart");
  }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const bestSellers = products.filter(product => product.bestseller);

  if (status === 'loading') return <p>Loading best sellers...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="best-sellers">
      <h2 className='text-center pt-4 fw-bold'>Best Sellers</h2>
      <div className="product-list d-flex">
        {bestSellers.map(product => (
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

export default BestSellers;





// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {useNavigate} from 'react-router-dom'
// import { fetchBestSellers } from '../features/products/productsSlice';
// import { addToCart } from '../features/cart/cartSlice';
// import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const BestSellers = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const bestSellers = useSelector((state) => state.products.bestSellers); // Ensure correct selector path
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);

//   console.log(bestSellers)
//   console.log(status)

//   const handleAddToCart = (product) => { 
//     dispatch(addToCart(product));
//     navigate("/cart");
//   }

//   useEffect(() => {
//     dispatch(fetchBestSellers());
//   }, [dispatch]);

//   const renderRatingStars = (rating) => {
//     const totalStars = 5;
//     const filledStars = Math.floor(rating);
//     const emptyStars = totalStars - filledStars;
//     return (
//       <>
//         {[...Array(filledStars)].map((_, index) => (
//           <FaStar size={20} key={index} className="filled-star" />
//         ))}
//         {[...Array(emptyStars)].map((_, index) => (
//           <FaRegStar size={20} key={index} className="empty-star" />
//         ))}
//       </>
//     );
//   };

//   if (status === 'loading') return <p>Loading best sellers...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   return (
//     <div className="best-sellers">
//       <h2 className='text-center pt-4 fw-bold'>Best Sellers</h2>
//       <div className="product-list">
//         {bestSellers.map(product => (
//           <div key={product.id} className="product-card">
//           <Link to={`/product/${product.name}`} className="product-image-card">
//             <img src={product.image} alt={product.name} className="product-image" />
//             <h2 className="product-name">{product.name}</h2>
//           </Link>
//           <p className='product-short-description'>{product.shortDescription}</p>
//           <div className="product-rating">
//             {renderRatingStars(product.rating)}
//           </div>
//             <p className="product-price">₹ {product.price}</p>
//             <button onClick={() => handleAddToCart(product)} className="cartButton">
//               Add To Cart
//             </button>
//         </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;
