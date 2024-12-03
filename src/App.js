import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  { AuthProvider } from './components/context/AuthContext';
import CartProvider from './components/context/CartContext';
import Login from './components/Auth/Login';
import Cart from './components/Cart/Cart';
import Register from './components/Auth/Register';
import PrivateRoute from './PrivateRouts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
            <ToastContainer />

                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register/>} />
     
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Cart />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;