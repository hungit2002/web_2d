import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import Terms from './user/Terms';
import Profile from './user/Profile';
import Posts from './admin/Posts';
import Dashboard from './user/Dashboard';
import Cart from './user/Cart'; // Import Cart component
import axios from 'axios';
import CategoryGames from './user/CategoryGames';

const Customer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        const response = await axios.get(`${API_URL}/categories`);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Routes>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="cart" element={<Cart />} /> {/* Update this line */}
        <Route path="notifications" element={<div>Notifications Page</div>} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
        <Route path="settings" element={<div>Settings Page</div>} />
        
        {/* Dynamic category routes */}
        <Route path="games/category/:categoryId" element={<CategoryGames />} />
        
        {/* Blogs route */}
        <Route path="blogs" element={<div>Blogs</div>} />
        <Route path="terms" element={<Terms />} />
      </Routes>
    </>
  );
};

export default Customer;