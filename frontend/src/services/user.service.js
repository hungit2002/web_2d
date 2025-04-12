import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get user profile by ID
export const getUserProfile = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userId, userData) => {
  const token = localStorage.getItem('token');
  
  // Create FormData if there's an avatar file
  const formData = new FormData();
  
  // Add all user data to formData
  Object.keys(userData).forEach(key => {
    if (key === 'avatar' && userData[key] instanceof File) {
      formData.append(key, userData[key]);
    } else if (userData[key] !== undefined && key !== 'avatar') {
      formData.append(key, userData[key]);
    }
  });
  
  const response = await axios.put(`${API_URL}/users/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};