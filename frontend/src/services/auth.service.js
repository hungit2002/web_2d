import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const verifyRegistration = async (email, code, userData) => {
  const response = await axios.post(`${API_URL}/auth/verify`, {
    email,
    code,
    ...userData,
  });
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return {
    success: true,
    data: {
      user: response.data.user,
      token: response.data.token
    }
  };
}; 