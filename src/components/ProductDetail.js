import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { HiPlus, HiMinus } from "react-icons/hi";
import StarRating from './StarRating';
import './ProductDetail.css';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { productName } = useParams();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [showPotent, setShowPotent] = useState(false);
  const [showIdealFor, setShowIdealFor] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = products.find(p => p.name === productName);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart')
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="single-product-details">
      <div className='product-image-container'>
        <img src={product.image} alt={product.name} className="single-product-image" />
      </div>
      <div className='details-container'>
        <h1 className="single-product-name">{product.name}</h1>
        <div className="single-product-rating">
          <StarRating rating={product.rating} />
        </div>
        <p className="single-product-short-description">{product.shortDescription}</p>
        <p className="single-product-long-description">{product.longDescription}</p>
        <div className='single-product-price'>
          <h3>PRICE</h3>
          <p className='d-flex align-items-center'><FaIndianRupeeSign />{product.price}</p>
        </div>
        <button onClick={() => handleAddToCart(product)} className="single-cartButton">
          ADD TO CART
        </button>
        <div>
          <div className='d-flex justify-content-between w-100 ' onClick={() => setShowPotent(!showPotent)}>
            <h4 className='fw-bold fs-5'>What makes it Potent</h4>
            <p>{showPotent ? <HiMinus /> : <HiPlus />}</p>            
          </div>
          {showPotent && <p className='fs-5'>{product.whatMakesItPotent}</p>}
          <hr className='hr-line'/>
        </div>
        <div>
          <div className='d-flex justify-content-between w-100' onClick={() => setShowIdealFor(!showIdealFor)}>
            <h4 className='fw-bold fs-5'>Ideal For</h4>
            <p>{showIdealFor ? <HiMinus /> : <HiPlus />}</p>            
          </div>
          {showIdealFor && (
            <div className='fs-5'>
              <p>Skin Concerns: {product.skinConcerns}</p>
              <p>Skin Type: {product.skinType}</p>
              <p>When to use: {product.whenToUse}</p>
            </div>
          )}
          <hr className='hr-line'/>
        </div>
        <div className="product-ingredients">
          <h3 className='fw-bold fs-5'>Ingredients</h3>
          <ul>
            {product.ingredients.map((ingredient, index) => (
              <li className="ingredient fs-5" key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;




// // src/components/ProductDetails.js
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchProducts } from '../features/products/productsSlice';
// import { addToCart } from '../features/cart/cartSlice';
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import { HiPlus } from "react-icons/hi";
// import './ProductDetail.css';

// const ProductDetails = () => {
//   const dispatch = useDispatch();
//   const { productName } = useParams();
//   const products = useSelector((state) => state.products.items);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);
//   const [showPotent, setShowPotent] = useState(false);
//   const [showIdealFor, setShowIdealFor] = useState(false);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   const product = products.find(p => p.name === productName);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

  

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

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>{error}</p>;
//   if (!product) return <p>Product not found</p>;

//   return (
//     <div className="single-product-details">
//       <div className='product-image-container'>
//       <img src={product.image} alt={product.name} className="single-product-image" />
//       </div>
//       <div className='details-container'>
//           <h1 className="single-product-name">{product.name}</h1>
//           <div className="single-product-rating">{renderRatingStars(product.rating)}</div>
//           <p className="single-product-short-description">{product.shortDescription}</p>
//           <p className="single-product-long-description">{product.longDescription}</p>
//           <div className='single-product-price'>
//             <h3>PRICE</h3>
//             <p className='d-flex align-items-center'><FaIndianRupeeSign />{product.price}</p>
//           </div>
//           {/* <div className="product-concerns">
//             <h3>Concerns</h3>
//             <ul>
//               {product.skinConcerns.map((concern, index) => (
//                 <li key={index}>{concern}</li>
//               ))}
//             </ul>
//           </div> */}
//           <button onClick={() => handleAddToCart(product)} className="single-cartButton">
//           ADD TO CART
//         </button>
//           <div>
//             <div className='d-flex justify-content-between w-100 ' onClick={() => setShowPotent(!showPotent)}>
//                 <h4 className='fw-bold fs-5'>What makes it Potent</h4>
//                 <p><HiPlus /></p>            
//               </div>
//               {showPotent && <p className='fs-5'>{product.whatMakesItPotent}</p>}
//               <hr className='hr-line'/>
//           </div>

//           <div>
//             <div className='d-flex justify-content-between w-100' onClick={() => setShowIdealFor(!showIdealFor)}>
//                 <h4 className='fw-bold fs-5'>Ideal For</h4>
//                 <p><HiPlus /></p>            
//               </div>
//               {showIdealFor && <div className='fs-5'>
//                 <p>Skin Concerns: {product.skinConcerns}</p>
//                 <p>Skin Type: {product.skinType}</p>
//                 <p>When to use: {product.whenToUse}</p>
//                 </div>}
//                 <hr className='hr-line'/>
//           </div>
          
//           {/* <div className="product-usage">
//             <h3>When to Use</h3>
//             <p>{product.whenToUse}</p>
//           </div> */}

//           <div className="product-ingredients">
//           <h3 className='fw-bold fs-5'>Ingredients</h3>
//           <ul>
//             {product.ingredients.map((ingredient, index) => (
//               <li className="ingredient fs-5" key={index}>{ingredient}</li>
//             ))}
//           </ul>
//         </div>

          
//       </div>
      
      
      
      
      
//     </div>
//   );
// };

// export default ProductDetails;
