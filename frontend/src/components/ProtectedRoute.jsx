import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getAccessToken} from "../utils/session.js";

const ProtectedRoute = () => {
  const isAuthenticated = getAccessToken()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 
