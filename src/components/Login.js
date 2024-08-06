// // src/components/Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../features/auth/authSlice';
// import { loadUserOrders } from '../features/order/orderSlice';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(loginUser(email, password));
//       dispatch(loadUserOrders(email));
//       toast.success("Login successfully");
//       navigate('/checkout');
//     } catch (error) {
//       toast.error("Invalid Email or password");
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center '>
//       <div className='w-50 d-flex flex-column mt-5' style={{ height: "400px" }}>
//         <h1 className='text-center'>Customer Login</h1>
//         <hr className='w-100' style={{ color: "#000", height: "14px", width: "450px" }} />
//         <form className='w-75 d-flex flex-column'>
//           <div className="form-group mt-3">
//             <input type="email" className="form-control p-2 fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
//               value={email}
//               onChange={e => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="password" className="form-control p-2 fs-5" id="exampleInputPassword1" placeholder="Password"
//               value={password}
//               onChange={e => setPassword(e.target.value)} />
//           </div>
//           <div className='d-flex align-items-center w-100 gap-3 mt-3 h-3'>
//             <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleLogin}>Login</button>
//             <p className='fs-5 '>Don't Have an account <br /><Link to="/signup">Create an account</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(email, password));
      toast.success("Login successfully");
      navigate('/shop');
    } catch (error) {
      toast.error("Invalid Email or password");
    }
  };

  return (
    <div className='d-flex justify-content-center '>
      <div className='login-container  d-flex flex-column mt-5'>
        <h1 className='text-left'>Customer Login</h1>
        <hr className='w-100' style={{ color: "#000", height: "14px", width: "450px" }} />
        <form className='form-container'>
          <div className="form-group mt-3">
            <input type="email" className="form-control p-2 fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <input type="password" className="form-control p-2 fs-5" id="exampleInputPassword1" placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='submit-section'>
            <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleLogin}>Login</button>
            <p className='signup-link '>Don't Have an account <br /><Link to="/signup">Create an account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


// // src/components/Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../features/auth/authSlice';
// import { toast } from 'react-toastify';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(loginUser(email, password));
//       toast.success("Login successfully");
//       navigate('/checkout');
//     } catch (error) {
//       toast.error("Invalid Email or password");
//     }
//   };

//   return (
//     <div className='d-flex justify-content-center '>
//       <div className='w-50 d-flex flex-column mt-5' style={{ height: "400px" }}>
//         <h1 className='text-center'>Customer Login</h1>
//         <hr className='w-100' style={{ color: "#000", height: "14px", width: "450px" }} />
//         <form className='w-75 d-flex flex-column'>
//           <div className="form-group mt-3">
//             <input type="email" className="form-control p-2 fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
//               value={email}
//               onChange={e => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="password" className="form-control p-2 fs-5" id="exampleInputPassword1" placeholder="Password"
//               value={password}
//               onChange={e => setPassword(e.target.value)} />
//           </div>
//           <div className='d-flex align-items-center w-100 gap-3 mt-3 h-3'>
//             <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleLogin}>Login</button>
//             <p className='fs-5 '>Don't Have an account <br /><Link to="/signup">Create an account</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



// import firebase from '../firebase.config'
// import React,{useState} from 'react'
// import { Link,useNavigate } from 'react-router-dom'

// import {toast} from 'react-toastify'

// const Login = () => {
//     const navigate = useNavigate();
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

//     const handleLogin=async(e)=>{
//         e.preventDefault();
//         try{
//             const user=await firebase.auth().signInWithEmailAndPassword(email,password)
//             if(user){
//                 // alert("Login successfully");
//                 toast.success("Login successfully")
//                 navigate('/checkout');
//             }
//         }catch(error){
//             // alert(error)
//             toast.error("Invalid Email or password")
//         }
//     }

//    return (
//     <div className='d-flex justify-content-center '>
//         <div className='w-50 d-flex flex-column mt-5' style={{height:"400px"}}>
//         <h1 className='text-center'>Customer Login</h1>
//         <hr className='w-100' style={{color: "#000", height: "14px", width: "450px"}}/>
//         <form className='w-75 d-flex flex-column'>
//             <div className="form-group mt-3">
//                 <input type="email" className="form-control p-2 fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
//                 value={email}
//                 onChange={e=>setEmail(e.target.value)}/>
//                 {/* <small id="emailHelp" class="form-text text-muted text-start">We'll never share your email with anyone else.</small> */}
//             </div>
//             <div className="form-group mt-3">
//                 <input type="password" className="form-control p-2 fs-5" id="exampleInputPassword1" placeholder="Password" 
//                 value={password} 
//                 onChange={e=>setPassword(e.target.value)}/>
//             </div>
//             <div className='d-flex align-items-center w-100 gap-3 mt-3 h-3'>
//             <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleLogin}>Login</button>
//             <p className='fs-5 '>Don't Have an account <br/><Link to="/signup">Create an account</Link></p>
//             </div>
            
//         </form>
//     </div>
//     </div>
    
//   )
// }

// export default Login