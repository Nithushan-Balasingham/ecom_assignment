import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    return storedUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
