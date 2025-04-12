import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import { FaShoppingCart, FaBell, FaUser, FaUserShield, FaChartBar, FaUsers, FaBoxOpen, FaShoppingBag, FaCog } from 'react-icons/fa';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken, isAdminSession } from "./utils/session.js";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Admin Layout Component
const AdminLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
  const location = useLocation();
  const authState = useSelector(state => state.auth);
  
  useEffect(() => {
    setIsAuthenticated(getAccessToken());
  }, [location, authState]);
  
  return (
    <div className="AdminApp">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* Admin Logo */}
          <Navbar.Brand href="/admin/dashboard">
            <FaUserShield className="d-inline-block align-top me-2" size={24} />
            Web2D Admin
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/dashboard">
                <FaChartBar className="me-1" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/admin/users">
                <FaUsers className="me-1" /> Users
              </Nav.Link>
              <Nav.Link href="/admin/products">
                <FaBoxOpen className="me-1" /> Products
              </Nav.Link>
              <Nav.Link href="/admin/orders">
                <FaShoppingBag className="me-1" /> Orders
              </Nav.Link>
              <Nav.Link href="/admin/settings">
                <FaCog className="me-1" /> Settings
              </Nav.Link>
            </Nav>
            
            <Nav>
              <NavDropdown 
                title={
                  <div className="d-inline-block">
                    <FaUserShield size={20} /> Admin
                  </div>
                } 
                id="admin-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/admin/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    window.location.href = '/admin/login';
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
};

// User Layout Component
const UserLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
  const location = useLocation();
  const authState = useSelector(state => state.auth);
  
  // These would typically come from your Redux store
  const cartItemCount = 3; // Example value
  const notificationCount = 5; // Example value
  
  useEffect(() => {
    setIsAuthenticated(getAccessToken());
  }, [location, authState]);
  
  return (
    <div className="UserApp">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          {/* Logo - Always visible */}
          <Navbar.Brand href="/">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Web2D Logo"
            />
            Web2D
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Only show navigation items when authenticated */}
            {isAuthenticated ? (
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
            ) : (
              <Nav className="me-auto">
                {/* Empty nav when not authenticated */}
              </Nav>
            )}
            
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
                      localStorage.removeItem('token');
                      setIsAuthenticated(false);
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
        {children}
      </Container>
    </div>
  );
};

// AppContent component that uses Redux
const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
  const [isAdmin, setIsAdmin] = useState(false); // You'll need to determine this from your auth state
  const location = useLocation();
  const authState = useSelector(state => state.auth);
  
  // Update authentication status when location changes or auth state changes
  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(token);
    
    // Check admin status
    const adminStatus = isAdminSession();
    console.log(adminStatus);
    
    const isAdminPath = location.pathname.startsWith('/admin');
    const isAdminLoginPath = location.pathname === '/admin/login';
    
    if (token && adminStatus && isAdminPath && !isAdminLoginPath) {
      setIsAdmin(true);
    } else if (!token || !adminStatus) {
      setIsAdmin(false);
      // Redirect non-admin users away from admin paths
      if (isAdminPath && !isAdminLoginPath) {
        window.location.href = '/admin/login';
      }
    }
  }, [location, authState]);
  
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin/*" element={
        <Routes>
          {/* Admin Public Routes */}
          <Route path="login" element={<AdminLogin />} />
          
          {/* Admin Protected Routes - Using AdminLayout */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="*" element={
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<div>Admin Users Management</div>} />
                  <Route path="products" element={<div>Admin Products Management</div>} />
                  <Route path="orders" element={<div>Admin Orders Management</div>} />
                  <Route path="settings" element={<div>Admin Settings</div>} />
                  <Route path="profile" element={<div>Admin Profile</div>} />
                  {/* Redirect admin root to dashboard */}
                  <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
                </Routes>
              </AdminLayout>
            } />
          </Route>
        </Routes>
      } />
      
      {/* User Routes */}
      <Route path="/*" element={
        <UserLayout>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cart" element={<div>Cart Page</div>} />
              <Route path="notifications" element={<div>Notifications Page</div>} />
              <Route path="profile" element={<div>Profile Page</div>} />
              <Route path="settings" element={<div>Settings Page</div>} />
              {/* Game routes */}
              <Route path="games/mobile" element={<div>Mobile Games</div>} />
              <Route path="games/web" element={<div>Web Games</div>} />
              <Route path="games/blockchain" element={<div>Blockchain Games</div>} />
              
              {/* Blogs route */}
              <Route path="blogs" element={<div>Blogs</div>} />
            </Route>

            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route 
              path="" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </UserLayout>
      } />
    </Routes>
  );
};

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
