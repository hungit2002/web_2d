import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import Terms from './user/Terms';
import Profile from './user/Profile';
import Posts from './admin/Posts';

const Customer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <Routes>
        <Route path="dashboard" element={<div>Dashboard Page</div>} />
        <Route path="cart" element={<div>Cart Page</div>} />
        <Route path="notifications" element={<div>Notifications Page</div>} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
        <Route path="settings" element={<div>Settings Page</div>} />
        {/* Game routes */}
        <Route path="games/mobile" element={<div>Mobile Games</div>} />
        <Route path="games/web" element={<div>Web Games</div>} />
        <Route path="games/blockchain" element={<div>Blockchain Games</div>} />

        {/* Blogs route */}
        <Route path="blogs" element={<div>Blogs</div>} />
        <Route path="terms" element={<Terms />} />
      </Routes>
    </>
  );
};

export default Customer; 