import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create a new order from cart items
export const createOrder = async (paymentMethod = 1) => {
  const response = await axios.post(
    `${API_URL}/orders`,
    { paymentMethod },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return response.data;
};

// Get user orders
export const getUserOrders = async () => {
  const response = await axios.get(
    `${API_URL}/api/orders`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
  
  return response.data;
};