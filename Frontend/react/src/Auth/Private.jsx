import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from './isAuth';

const PrivateRoute = () => {
  const token = isAuthenticated();
  
  return token ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
