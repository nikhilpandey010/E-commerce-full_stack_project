
import React from 'react';

const Product = ({ product }) => {
  const formattedPrice = product.price 
    ? Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 }) 
    : '0.00';

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Added no-underline and forced normal style */}
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] no-underline list-none decoration-none group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between">
          {/* Added no-underline and forced text decoration to none */}
          <p className="text-xl font-black text-gray-900 no-underline decoration-transparent inline-block">
            ₹{formattedPrice}
          </p>
          
          <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <span className="text-xl font-light">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;



