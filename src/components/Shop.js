import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const [filterOption, setFilterOption] = useState('none');
  

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  // Create a new array to sort, rather than modifying the original array
  const getSortedProducts = (products) => {
    return [...products].sort((a, b) => {
      switch (filterOption) {
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'priceHighToLow':
          return b.price - a.price;
        case 'alphabeticalAZ':
          return a.name.localeCompare(b.name);
        case 'alphabeticalZA':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const sortedProducts = getSortedProducts(filteredProducts);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className="shop">
      <h1 className='text-center pt-4 fw-bold'>All Products</h1>
      <div className="filter-sort">
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="filter-select"
        >
          <option value="none">Sort</option>
          <option value="priceLowToHigh">Low to High</option>
          <option value="priceHighToLow">High to Low</option>
          <option value="alphabeticalAZ">A to Z</option>
          <option value="alphabeticalZA">Z to A</option>
        </select>
      </div>

      <div className="product-list d-flex ">
        {sortedProducts.map((product) => (
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

export default Shop;



// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../features/products/productsSlice';
// import { addToCart } from '../features/cart/cartSlice';
// import { Link } from 'react-router-dom';
// import StarRating from './StarRating';
// import './Shop.css';

// const Shop = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const products = useSelector((state) => state.products.items);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);
//   const searchTerm = useSelector((state) => state.products.searchTerm);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     navigate('/cart');
//   };

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   const filteredProducts = searchTerm
//     ? products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : products;

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   return (
//     <div className="shop">
//       <h1 className='text-center pt-4 fw-bold'>All Products</h1>
//       <div className="product-list d-flex justify-content-center">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <Link to={`/product/${product.name}`} className="product-image-card">
//               <img src={product.image} alt={product.name} className="product-image" />
//               <h2 className="product-name">{product.name}</h2>
//             </Link>
//             <p className='product-short-description'>{product.shortDescription}</p>
//             <div className="product-rating">
//               <StarRating rating={product.rating} />
//             </div>
//             <p className="product-price">₹ {product.price}</p>
//             <button onClick={() => handleAddToCart(product)} className="cartButton">
//               Add To Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Shop;



// // src/components/Shop.js
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../features/products/productsSlice';
// import { addToCart } from '../features/cart/cartSlice';
// import { Link } from 'react-router-dom';
// //import { CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa";
// import './Shop.css';

// const Shop = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const products = useSelector((state) => state.products.items);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);
//   const searchTerm = useSelector((state) => state.products.searchTerm);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//     navigate('/cart');
//   };

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   const filteredProducts = searchTerm
//     ? products.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     : products;

//     const renderRatingStars = (rating) => {
//       const totalStars = 5;
//       const filledStars = Math.floor(rating);
//       const emptyStars = totalStars - filledStars;
//       return (
//         <>
//           {[...Array(filledStars)].map((_, index) => (
//             <FaStar size={20} key={index} className="filled-star" />
//           ))}
//           {[...Array(emptyStars)].map((_, index) => (
//             <FaRegStar size={20} key={index} className="empty-star" />
//           ))}
//         </>
//       );
//     };

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   return (
//     <div className="shop">
//       <h1 className='text-center pt-4 fw-bold'>All Products</h1>
//       <div className="product-list">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <Link to={`/product/${product.name}`} className="product-image-card">
//               <img src={product.image} alt={product.name} className="product-image" />
//               <h2 className="product-name">{product.name}</h2>
//             </Link>
//             <p className='product-short-description'>{product.shortDescription}</p>
//             <div className="product-rating">
//               {renderRatingStars(product.rating)}
//             </div>
//               <p className="product-price">₹ {product.price}</p>
//               <button onClick={() => handleAddToCart(product)} className="cartButton">
//                 Add To Cart
//               </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Shop;












// // src/components/Shop.js
// import React, { useEffect } from 'react';
// import {useNavigate} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../features/products/productsSlice';
// import { addToCart } from '../features/cart/cartSlice';
// import { Link } from 'react-router-dom';

// import './Shop.css';

// const Shop = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const products = useSelector((state) => state.products.items);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);

//   console.log('products:', products);
//   const handleAddToCart = (product) => { 
//     dispatch(addToCart(product));
//     navigate("/cart");
//   }

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchProducts());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') return <p>Loading...</p>;
//   if (status === 'failed') return <p>{error}</p>;

//   return (
//     <div className="shop">
//       <h1>All Products</h1>
//       <div className="product-list">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <Link to={`/product/${product.id}`} className='product-image-card'>
//               <img src={product.image} alt={product.name} className="product-image" />
//               <h2 className="product-name">{product.name}</h2>
//             </Link>
//             <p className="product-price">₹{product.price}</p>
//             <button onClick={()=>handleAddToCart(product)} className='cartButton'>Add To Cart</button>
//             {/* <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button> */}
//           </div>
//         ))}
//       </div>
      
//     </div>
//   );
// };

// export default Shop;
