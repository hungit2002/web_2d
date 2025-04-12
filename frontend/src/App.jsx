import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { FaShoppingCart, FaBell, FaUser } from 'react-icons/fa';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector } from 'react-redux';
import { getAccessToken } from "./utils/session.js";

// AppContent component that uses Redux
const AppContent = () => {
  const isAuthenticated = getAccessToken();
  // These would typically come from your Redux store
  const cartItemCount = 3; // Example value
  const notificationCount = 5; // Example value
  
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            {/* Logo */}
            <Navbar.Brand href="/">
              <img
                src="/logo.png" // Add your logo image to public folder
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                alt="Web2D Logo"
              />
              Web2D
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* Home Link */}
                <Nav.Link href="/">Home</Nav.Link>
                
                {/* Games Dropdown */}
                <NavDropdown title="Games" id="games-dropdown">
                  <NavDropdown.Item href="/games/mobile">Game Mobile</NavDropdown.Item>
                  <NavDropdown.Item href="/games/web">Game Web</NavDropdown.Item>
                  <NavDropdown.Item href="/games/blockchain">Blockchain</NavDropdown.Item>
                </NavDropdown>
                
                {/* Blogs Link */}
                <Nav.Link href="/blogs">Blogs</Nav.Link>
              </Nav>
              
              {!isAuthenticated ? (
                <Nav>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
              ) : (
                <Nav>
                  {/* Cart Icon with Badge */}
                  <Nav.Link href="/cart" className="position-relative me-3">
                    <FaShoppingCart size={20} />
                    {cartItemCount > 0 && (
                      <Badge 
                        pill 
                        bg="danger" 
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </Nav.Link>
                  
                  {/* Notification Icon with Badge */}
                  <Nav.Link href="/notifications" className="position-relative me-3">
                    <FaBell size={20} />
                    {notificationCount > 0 && (
                      <Badge 
                        pill 
                        bg="danger" 
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ fontSize: '0.6rem' }}
                      >
                        {notificationCount}
                      </Badge>
                    )}
                  </Nav.Link>
                  
                  {/* User Avatar Dropdown */}
                  <NavDropdown 
                    title={
                      <div className="d-inline-block">
                        <FaUser size={20} />
                      </div>
                    } 
                    id="user-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
                      onClick={() => {
                        // Dispatch logout action here
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add other protected routes here */}
              <Route path="/cart" element={<div>Cart Page</div>} />
              <Route path="/notifications" element={<div>Notifications Page</div>} />
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
            </Route>

            {/* Game routes */}
            <Route path="/games/mobile" element={<div>Mobile Games</div>} />
            <Route path="/games/web" element={<div>Web Games</div>} />
            <Route path="/games/blockchain" element={<div>Blockchain Games</div>} />
            
            {/* Blogs route */}
            <Route path="/blogs" element={<div>Blogs</div>} />

            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
