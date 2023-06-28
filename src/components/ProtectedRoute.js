import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from './Movies/Preloader/Preloader';

const ProtectedRouteElement = ({ isLoggedIn, isLoading, children }) => {
  if (isLoading) return <Preloader />;
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRouteElement;
