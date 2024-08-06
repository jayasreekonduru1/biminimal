// src/components/SkinBodyCare.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const SkinBodyCare = () => {
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

  const skinBodyCareProducts = products.filter(product => product.category === 'Skin Body Care');

  if (status === 'loading') return <p>Loading skin and body care products...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="skin-body-care-products">
      <h2 className='text-center pt-4 fw-bold'>Skin & Body Care</h2>
      <div className="product-list d-flex">
        {skinBodyCareProducts.map(product => (
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

export default SkinBodyCare;



// // src/components/BabyCare.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {useNavigate} from 'react-router-dom'
// import { addToCart } from '../features/cart/cartSlice';
// import { fetchSkinBodyCareProducts } from '../features/products/productsSlice';
// import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const SkinBodyCare = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const skinbodyCareProducts = useSelector((state) => state.products.skinbodyCare);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);

//   const handleAddToCart = (product) => { 
//     dispatch(addToCart(product));
//     navigate("/cart");
//   }

//   useEffect(() => {
//     dispatch(fetchSkinBodyCareProducts());
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

//   if (status === 'loading') return <p>Loading baby care products...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   return (
//     <div className="skin-body-care-products">
//       <h2 className='text-center pt-4 fw-bold'>Skin Body Care </h2>
//       <div className="product-list">
//         {skinbodyCareProducts.map(product => (
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

// export default SkinBodyCare;
