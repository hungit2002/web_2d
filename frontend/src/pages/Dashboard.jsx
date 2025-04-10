import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <div className="card shadow">
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Dashboard</h2>
          <p className="text-center">Welcome to your dashboard!</p>
          <div className="d-grid gap-2">
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard; 