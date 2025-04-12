import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import {Provider, useSelector} from 'react-redux';
import {store} from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import {getAccessToken, isAdminSession} from "./utils/session.js";
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Terms from './pages/Terms.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

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
                  <Route path="/*" element={<Admin />} />
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
              <Route path="profile" element={<Profile/>} />
              <Route path="settings" element={<div>Settings Page</div>} />
              {/* Game routes */}
              <Route path="games/mobile" element={<div>Mobile Games</div>} />
              <Route path="games/web" element={<div>Web Games</div>} />
              <Route path="games/blockchain" element={<div>Blockchain Games</div>} />
              
              {/* Blogs route */}
              <Route path="blogs" element={<div>Blogs</div>} />
              <Route path="terms" element={<Terms />} />
            </Route>

            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route 
              path="" 
              element={
                isAuthenticated ? (
                  isAdminSession() ? 
                  <Navigate to="/admin/dashboard" replace /> :
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
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
