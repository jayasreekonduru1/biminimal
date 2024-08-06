// src/components/Search.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
  const [searchTerm, setLocalSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(searchTerm));
    navigate('/shop');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          className='search-input'
          placeholder="Search for products..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
