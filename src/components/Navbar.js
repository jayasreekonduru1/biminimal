// src/components/Navbar.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdPersonOutline } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiShoppingCart, FiSearch,FiLogOut} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import './Navbar.css'; // create corresponding CSS for styling

import Search from './Search';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    
    toast.success("Logged out successfully");
    navigate("/")
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <i className="icon hamburger-icon" onClick={toggleMenu}><GiHamburgerMenu size={25} /></i>
        <div className="brand"><Link to="/" className='icon-list-link' onClick={closeMenu}>BiMinimal</Link></div>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/shop" className='list-link' onClick={closeMenu}>Shop</Link></li>
        <li><Link to="/bestsellers" className='list-link' onClick={closeMenu}>Bestsellers</Link></li>
        <li><Link to="/skin-body-care" className='list-link' onClick={closeMenu}>Skin + Body Care</Link></li>
        <li><Link to="/hair-care" className='list-link' onClick={closeMenu}>Hair Care</Link></li>
        <li><Link to="/baby-care" className='list-link' onClick={closeMenu}>Baby Care</Link></li>
        <li><Link to="/blogs" className='list-link' onClick={closeMenu}>Blogs</Link></li>
        {isAuthenticated && (
            <li><Link to="/order-details" className='list-link' onClick={closeMenu}>Orders</Link></li>
          )}
      </ul>
        <div className="nav-icons">
          <i className="icon search-icon" onClick={toggleSearch}><FiSearch size={25} /></i>
          {isAuthenticated ? (
            <i className="icon logout-icon" onClick={handleLogout}><FiLogOut size={25} /></i>
          ) : (
            <i className="icon profile-icon"><Link to="/login" className='icon-list-link'><MdPersonOutline size={25} /></Link></i>
          )}
          <i className="icon cart-icon"><Link to="/cart" className='icon-list-link'><FiShoppingCart size={25} /></Link></i>
        </div>
      </div>
      {isSearchOpen && <Search />}
    </nav>
  );
};

export default Navbar;










// // src/components/Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MdPersonOutline } from "react-icons/md";
// import { FiShoppingCart,FiSearch } from "react-icons/fi";
// import './Navbar.css'; // create corresponding CSS for styling

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="brand"><Link to="/" className='list-link'>Bee-Minimal</Link></div>
//       <ul className="nav-links">
//         <li ><Link to="/shop" className='list-link'>Shop</Link></li>
//         <li><Link to="/bestsellers" className='list-link'>Bestsellers</Link></li>
//         <li><Link to="/skin-body-care" className='list-link'>Skin + Body Care</Link></li>
//         <li><Link to="/hair-care" className='list-link'>Hair Care</Link></li>
//         <li><Link to="/baby-care" className='list-link'>Baby Care</Link></li>
//         <li><Link to="/blogs" className='list-link'>Blogs</Link></li>
//       </ul>
//       <div className="nav-icons">
//         <i className="icon search-icon"><FiSearch size={25}/></i>
//         <i className="icon profile-icon"><MdPersonOutline size={25}/></i>
//         <i className="icon cart-icon"><Link to="/cart" className='list-link'><FiShoppingCart size={25}/></Link></i>
//       </div>
      
//     </nav>
//   );
// };

// export default Navbar;
