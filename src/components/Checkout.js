import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { getTotals, clearCart } from '../features/cart/cartSlice';
import { setOrderDetails, setUserEmail } from '../features/order/orderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(auth.user.email || '');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, cart.cartItems]);

  const handleOrderPlacement = () => {
    const orderDetails = {
      name: auth.user.displayName || 'User',
      email,
      address: `${address}, ${address2}`,
      city,
      state,
      zip,
      cartItems: cart.cartItems,
      cartTotalAmount: cart.cartTotalAmount,
    };

    dispatch(setUserEmail(email));
    dispatch(setOrderDetails(orderDetails));
    dispatch(clearCart());
    toast.success("Order placed successfully");
    navigate('/order-details');
  };

  return (
    <div className="checkout-container d-flex justify-content-center gap-5">
      <div className='billing-section d-flex flex-column align-items-center p-4'>
        <h3>Billing Information</h3>
        <form className='d-flex flex-column w-100 fs-6'>
          <div className="form-group mt-3">
            <input type="email" className="form-control fs-5" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control fs-5" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <input type="text" className="form-control fs-5" placeholder="Apartment, studio, or floor" value={address2} onChange={(e) => setAddress2(e.target.value)} />
          </div>
          <div className="form-row mt-3">
            <div className="form-group col-md-6">
              <input type="text" className="form-control fs-5" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="form-group col-md-6 mt-3">
              <select className="form-control fs-5" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="" disabled>State</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            <div className="form-group col-md-6 mt-3">
              <input type="text" className="form-control fs-5" placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
            </div>
          </div>
        </form>
      </div>
      
      <div className="order-summary-section d-flex flex-column align-items-center p-4">
        <h3>Order Summary</h3>
        <div className="order-summary w-100">
          {cart.cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <div>
              {cart.cartItems.map((item) => (
                <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2" key={item.id}>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.cartQuantity}</p>
                    <p>Price: <FaIndianRupeeSign />{item.price}</p>
                  </div>
                  <div className="item-total-price">
                    Total: <FaIndianRupeeSign />{item.price * item.cartQuantity}
                  </div>
                </div>
              ))}
              <div className="order-total d-flex justify-content-end w-100 mt-3">
                <h4>Total Price: <FaIndianRupeeSign />{cart.cartTotalAmount}</h4>
              </div>
              <div>
                <h3>Payment</h3>
                <label className="container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <p className="text-con">Cash on Delivery</p>
              </div>

              <div className="d-flex justify-content-end w-100 mt-3">
                <button type="button" className="btn btn-dark" onClick={handleOrderPlacement}>BUY NOW</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaIndianRupeeSign } from 'react-icons/fa6';
// import { getTotals, clearCart } from '../features/cart/cartSlice';
// import { setOrderDetails, setUserEmail } from '../features/order/orderSlice';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './Checkout.css';

// const Checkout = () => {
//   const cart = useSelector((state) => state.cart);
//   const auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zip, setZip] = useState('');

//   useEffect(() => {
//     dispatch(getTotals());
//   }, [dispatch, cart.cartItems]);

//   const handleOrderPlacement = () => {
//     const orderDetails = {
//       name: auth.user.displayName || 'User',
//       email,
//       address: `${address}, ${address2}`,
//       city,
//       state,
//       zip,
//       cartItems: cart.cartItems,
//       cartTotalAmount: cart.cartTotalAmount,
//     };

//     // Get existing orders from local storage
//     const existingOrders = JSON.parse(localStorage.getItem(email)) || [];
//     // Add the new order
//     existingOrders.push(orderDetails);
//     // Save back to local storage
//     localStorage.setItem(email, JSON.stringify(existingOrders));

//     dispatch(setOrderDetails(orderDetails));
//     dispatch(setUserEmail(email));
//     dispatch(clearCart());
//     toast.success("Order placed successfully");
//     navigate('/order-details');
//   };

//   return (
//     <div className="checkout-container d-flex justify-content-center gap-5">
//       <div className='billing-section d-flex flex-column align-items-center p-4'>
//         <h3>Billing Information</h3>
//         <form className='d-flex flex-column w-100 fs-6'>
//           <div className="form-group mt-3">
//             <input type="email" className="form-control fs-5" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="text" className="form-control fs-5" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="text" className="form-control fs-5" placeholder="Apartment, studio, or floor" value={address2} onChange={(e) => setAddress2(e.target.value)} />
//           </div>
//           <div className="form-row mt-3">
//             <div className="form-group col-md-6">
//               <input type="text" className="form-control fs-5" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
//             </div>
//             <div className="form-group col-md-6 mt-3">
//               <select className="form-control fs-5" value={state} onChange={(e) => setState(e.target.value)}>
//                 <option value="" disabled>State</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Chennai">Chennai</option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="Bangalore">Bangalore</option>
//               </select>
//             </div>
//             <div className="form-group col-md-6 mt-3">
//               <input type="text" className="form-control fs-5" placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
//             </div>
//           </div>
//         </form>
//       </div>
      
//       <div className="order-summary-section d-flex flex-column align-items-center p-4">
//         <h3>Order Summary</h3>
//         <div className="order-summary w-100">
//           {cart.cartItems.length === 0 ? (
//             <p>No items in the cart</p>
//           ) : (
//             <div>
//               {cart.cartItems.map((item) => (
//                 <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2" key={item.id}>
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Quantity: {item.cartQuantity}</p>
//                     <p>Price: <FaIndianRupeeSign />{item.price}</p>
//                   </div>
//                   <div className="item-total-price">
//                     Total: <FaIndianRupeeSign />{item.price * item.cartQuantity}
//                   </div>
//                 </div>
//               ))}
//               <div className="order-total d-flex justify-content-end w-100 mt-3">
//                 <h4>Total Price: <FaIndianRupeeSign />{cart.cartTotalAmount}</h4>
//               </div>
//               <div>
//                 <h3>Payment</h3>
//                 <label className="container">
//                   <input type="checkbox" />
//                   <span className="checkmark"></span>
//                 </label>
//                 <p className="text-con">Cash on Delivery</p>
//               </div>

//               <div className="d-flex justify-content-end w-100 mt-3">
//                 <button type="button" className="btn btn-dark" onClick={handleOrderPlacement}>BUY NOW</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaIndianRupeeSign } from 'react-icons/fa6';
// import { getTotals, clearCart } from '../features/cart/cartSlice';
// import { setOrderDetails } from '../features/order/orderSlice';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import './Checkout.css';

// const Checkout = () => {
//   const cart = useSelector((state) => state.cart);
//   const auth = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [address2, setAddress2] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zip, setZip] = useState('');

//   useEffect(() => {
//     dispatch(getTotals());
//   }, [dispatch, cart.cartItems]);

//   const handleOrderPlacement = () => {
//     const orderDetails = {
//       name: auth.user.displayName || 'User',
//       email,
//       address: `${address}, ${address2}`,
//       city,
//       state,
//       zip,
//       cartItems: cart.cartItems,
//       cartTotalAmount: cart.cartTotalAmount,
//     };

//     dispatch(setOrderDetails(orderDetails));
//     dispatch(clearCart());
//     toast.success("Order placed successfully");
//     navigate('/order-details');
//   };

//   return (
//     <div className="checkout-container d-flex justify-content-center gap-5">
//       <div className='billing-section d-flex flex-column align-items-center p-4'>
//         <h3>Billing Information</h3>
//         <form className='d-flex flex-column w-100 fs-6'>
//           <div className="form-group mt-3">
//             <input type="email" className="form-control fs-5" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="text" className="form-control fs-5" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="text" className="form-control fs-5" placeholder="Apartment, studio, or floor" value={address2} onChange={(e) => setAddress2(e.target.value)} />
//           </div>
//           <div className="form-row mt-3">
//             <div className="form-group col-md-6">
//               <input type="text" className="form-control fs-5" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
//             </div>
//             <div className="form-group col-md-6 mt-3">
//               <select className="form-control fs-5" value={state} onChange={(e) => setState(e.target.value)}>
//                 <option value="" disabled>State</option>
//                 <option value="Hyderabad">Hyderabad</option>
//                 <option value="Chennai">Chennai</option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="Bangalore">Bangalore</option>
//               </select>
//             </div>
//             <div className="form-group col-md-6 mt-3">
//               <input type="text" className="form-control fs-5" placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
//             </div>
//           </div>
//         </form>
//       </div>
      
//       <div className="order-summary-section d-flex flex-column align-items-center p-4">
//         <h3>Order Summary</h3>
//         <div className="order-summary w-100">
//           {cart.cartItems.length === 0 ? (
//             <p>No items in the cart</p>
//           ) : (
//             <div>
//               {cart.cartItems.map((item) => (
//                 <div className="order-item d-flex justify-content-between align-items-center border p-2 mb-2" key={item.id}>
//                   <div className="item-details">
//                     <h4>{item.name}</h4>
//                     <p>Quantity: {item.cartQuantity}</p>
//                     <p>Price: <FaIndianRupeeSign />{item.price}</p>
//                   </div>
//                   <div className="item-total-price">
//                     Total: <FaIndianRupeeSign />{item.price * item.cartQuantity}
//                   </div>
//                 </div>
//               ))}
//               <div className="order-total d-flex justify-content-end w-100 mt-3">
//                 <h4>Total Price: <FaIndianRupeeSign />{cart.cartTotalAmount}</h4>
//               </div>
//               <div>
//                 <h3>Payment</h3>
//                 <label className="container">
//                   <input type="checkbox" />
//                   <span className="checkmark"></span>
//                 </label>
//                 <p className="text-con">Cash on Delivery</p>
//               </div>

//               <div className="d-flex justify-content-end w-100 mt-3">
//                 <button type="button" className="btn btn-dark" onClick={handleOrderPlacement}>BUY NOW</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



