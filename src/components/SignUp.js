// import firebase from '../firebase.config'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch } from "react-redux";
// import { initializeCart } from "../features/cart/cartSlice";
// import { toast } from 'react-toastify'

// const SignUp = () => {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const dispatch = useDispatch();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
//       if (userCredential) {
//         const user = userCredential.user;
//         // Save user to local storage
//         localStorage.setItem('user', JSON.stringify(user));
//         // Initialize an empty cart in local storage
//         dispatch(initializeCart());
//         toast.success("Account Created successfully")
//       }
//     } catch (error) {
//       toast.error("Invalid Email or password")
//     }
//   }

//   return (
//     <div className='d-flex justify-content-center '>
//       <div className='w-50 d-flex flex-column mt-5' style={{ height: "400px" }}>
//         <h1 className='text-center'>Customer Sign Up</h1>
//         <hr className='w-100' style={{ color: "#000", height: "14px", width: "450px" }} />
//         <form className='w-75 d-flex flex-column'>
//           <div className="form-group mt-3">
//             <input type="text" className="form-control p-2 fs-5" placeholder="User Name"
//               value={username}
//               onChange={e => setUsername(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="email" className="form-control p-2 fs-5" aria-describedby="emailHelp" placeholder="Email"
//               value={email}
//               onChange={e => setEmail(e.target.value)} />
//           </div>
//           <div className="form-group mt-3">
//             <input type="password" className="form-control p-2 fs-5" placeholder="Password"
//               value={password}
//               onChange={e => setPassword(e.target.value)} />
//           </div>
//           <div className='d-flex align-items-center w-100 gap-3 mt-3 h-3'>
//             <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleSignup}>Create An Account</button>
//             <p className='fs-5 '>Already Have an account <br /><Link to="/login">Login</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp


// import firebase from '../firebase.config'
// import React,{useState} from 'react'
// import {Link} from 'react-router-dom'

// import {toast} from 'react-toastify'


// const SignUp = () => {
//     const [username, setUsername]=useState('')
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')
//     // const [file,setFile]=useState(null)
//     // const [loading, setLoading]=useState(false)

//     const handleSignup=async(e)=>{
//         e.preventDefault();
//         try{
//             const user=await firebase.auth().createUserWithEmailAndPassword(email,password)
//             if(user){
//                 // alert("Account created successfully");
//                 toast.success("Account Created successfully")
//             }
//         }catch(error){
//             // alert(error)
//             toast.error("Invalid Email or password")
//         }
//     }

//    return (
//     <div className='d-flex justify-content-center '>
//         <div className='w-50 d-flex flex-column mt-5' style={{height:"400px"}}>
//         <h1 className='text-center'>Customer Sign Up</h1>
//         <hr className='w-100' style={{color: "#000", height: "14px", width: "450px"}}/>
//         <form className='w-75 d-flex flex-column'>
//         <div className="form-group mt-3">
//                 <input type="text" className="form-control p-2 fs-5" id="exampleInputUsername"  placeholder="User Name" 
//                 value={username}
//                 onChange={e=>setUsername(e.target.value)}/>
                
//             </div>
//             <div className="form-group mt-3">
//                 <input type="email" className="form-control p-2 fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" 
//                 value={email}
//                 onChange={e=>setEmail(e.target.value)}/>
                
//             </div>
//             <div className="form-group mt-3">
//                 <input type="password" className="form-control p-2 fs-5" id="exampleInputPassword1" placeholder="Password" 
//                 value={password} 
//                 onChange={e=>setPassword(e.target.value)}/>
//             </div>
//             <div className='d-flex align-items-center w-100 gap-3 mt-3 h-3'>
//             <button type="submit" className="btn btn-dark fs-5 p-2 w-50" onClick={handleSignup} >Create An Account</button>
//             <p className='fs-5 '>Already Have an account <br/><Link to="/login">Login</Link></p>
//             </div>
            
//         </form>
//     </div>
//     </div>
    
//   )
// }

// export default SignUp

// src/components/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebase from '../firebase.config';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/auth/authSlice';
import { loadCartFromLocalStorage } from '../features/cart/cartSlice';
import './SignUp.css'

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      dispatch(setAuth({ isAuthenticated: true, user }));
      dispatch(loadCartFromLocalStorage({ userId: user.uid }));
      toast.success("Account Created successfully");
    } catch (error) {
      toast.error("Invalid Email or password");
    }
  };

  return (
    <div className='d-flex justify-content-center '>
      <div className='signup-container'>
        <h1 className='text-left'>Customer Sign Up</h1>
        <hr className='w-100' style={{ color: "#000", height: "14px", width: "450px" }} />
        <form className='d-flex flex-column'>
          <div className="form-group mt-3">
            <input type="text" className="form-control p-2 fs-5" id="exampleInputUsername" placeholder="User Name"
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>
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
          <div className='submit-section d-flex align-items-center w-100 gap-3 mt-3 h-3'>
            <button type="submit" className="submit btn btn-dark" onClick={handleSignup} >Create an Account</button>
            <p className='login-link '>Already Have an account! <br /><Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
