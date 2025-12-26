

import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="animate-pulse">
        {/* Image Placeholder */}
        <div className="bg-gray-300 w-full aspect-square"></div>

        <div className="p-4">
          {/* Title Placeholder */}
          <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
          {/* Rating Placeholder */}
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          {/* Price Placeholder */}
          <div className="h-7 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;