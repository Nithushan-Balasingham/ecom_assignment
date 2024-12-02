import React, { useContext, useState } from "react";
import ProductCard from "../Product/ProductCard";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; 
import products from './productData.json';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, calculateTotal, addToCart, clearCart } = useContext(CartContext);
  const { logout } = useAuth();
    const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriceRange =
      selectedPriceRange === "" || 
      (selectedPriceRange === "200+" && product.price >= 200) ||
      (selectedPriceRange === "0-50" && product.price >= 0 && product.price <= 50) ||
      (selectedPriceRange === "50-100" && product.price > 50 && product.price <= 100) ||
      (selectedPriceRange === "100-200" && product.price > 100 && product.price <= 200);

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearchQuery && matchesPriceRange && matchesCategory;
  });

  const availableProducts = filteredProducts.filter(
    (product) => !cart.some((cartItem) => cartItem.id === product.id)
  );

  const handleLogout = () => {
    logout();
    toast.success("SignOut Successfully!", {
        autoClose: 1000,
      });      
    setTimeout(() => {
        clearCart()
        navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">
            Your cart is empty.
          </p>
        ) : (
          <div>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center bg-white shadow rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 text-right">
              Total: ${calculateTotal().toFixed(2)}
            </h3>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>

          <div className="flex flex-col w-72 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">Select Price Range</option>
              <option value="0-50">Price: $0 - $50</option>
              <option value="50-100">Price: $50 - $100</option>
              <option value="100-200">Price: $100 - $200</option>
              <option value="200+">Price: $200+</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="smartphone">Smartphones</option>
              <option value="accessory">Accessories</option>
            </select>
          </div>

          {availableProducts.length === 0 ? (
            <p className="text-center text-gray-600">
              No more products to add to the cart.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
