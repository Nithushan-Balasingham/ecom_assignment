import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart)); 
        } else {
            localStorage.removeItem('cart'); 
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                const updatedCart = prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem('cart', JSON.stringify(updatedCart)); 
                return updatedCart;
            } else {
                const updatedCart = [...prevCart, { ...product, quantity: 1 }];
                localStorage.setItem('cart', JSON.stringify(updatedCart)); 
                return updatedCart;
            }
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart)); 
            return updatedCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); 
            return updatedCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]); 
        localStorage.removeItem('cart'); 
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, calculateTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
