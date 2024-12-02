import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md  m-4 p-4 text-center hover:shadow-lg transition-shadow duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-gray-400 mb-4">${product.price.toFixed(2)}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
