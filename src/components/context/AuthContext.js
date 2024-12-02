import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const register = (name, email, password) => {
        const newUser = { name, email, password };
        console.log('Registering user:', newUser);
        localStorage.setItem('user', JSON.stringify(newUser)); 
        setUser(newUser);
        console.log('User registered:', newUser);
    };

    const login = (email, password) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            setUser(storedUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem('user'); 
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
