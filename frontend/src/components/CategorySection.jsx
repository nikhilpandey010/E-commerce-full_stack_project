import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: 'Mens Wear',
      icon: '👕',
      subCategories: [
        { name: "Men's Formal Shirt", slug: 'mens-formal-shirt' },
        { name: "Men's Casual Shirt", slug: 'mens-casual-shirt' },
        { name: "Men's Formal Pants", slug: 'mens-formal-pants' },
        { name: "Men's Jeans", slug: 'mens-jeans' },
        { name: "Men's T-shirt", slug: 'mens-t-shirt' },
       
      ],
    },
    {
      name: 'Womens Wear',
      icon: '👗',
      subCategories: [
        { name: 'Saree', slug: 'saree' },
        { name: 'Ladies Top', slug: 'ladies-top' },
        { name: 'Ladies Jeans', slug: 'ladies-jeans' },
        { name: 'Ladies Dresses', slug: 'ladies-dresses' },
        


      ],
    },
    {
      name: 'Watches',
      icon: '⌚',
      subCategories: [
        { name: 'Watches for Mens', slug: 'mens-watches' },
        { name: 'Watches for Womens', slug: 'ladies-watches' },
      ],
    },
    {
      name: 'Shoes',
      icon: '👟',
      subCategories: [
        { name: 'Mens Formal Shoes', slug: 'mens-formal-shoes' },
        { name: 'Mens Casual Shoes', slug: 'mens-casual-shoes' },
        { name: 'Womens Formal Shoes', slug: 'womens-formal-shoes' },
        { name: 'Womens Casual Shoes', slug: 'womens-casual-shoes' },
        { name: 'Sandal', slug: 'sandal' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-40">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight uppercase">
          Shop by Category
        </h2>
        <div className="h-1 w-24 bg-blue-600 mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {/* Category Card */}
            <div
              className={`h-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl transition-all duration-300 cursor-pointer border shadow-sm ${
                activeCategory === category.name
                  ? 'border-blue-500 shadow-xl ring-4 ring-blue-50 -translate-y-2'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
              }`}
            >
              <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </div>
              <span className="text-sm font-bold text-gray-700 uppercase tracking-widest text-center">
                {category.name}
              </span>
            </div>

            {/* Dropdown Options */}
            {activeCategory === category.name && (
              <div
                className="absolute left-0 w-full pt-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
                style={{ top: '100%' }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-black ring-opacity-5">
                  <div className="flex flex-col py-2">
                    {category.subCategories.map((sub) => (
                      <Link
                        key={sub.name}
                        to={`/productByCategory?category=${sub.slug}`}
                        className="group relative flex items-center px-6 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                      >
                        {/* Vertical Accent Line appearing on hover */}
                        <div className="absolute left-0 h-0 w-1 bg-blue-600 group-hover:h-full transition-all duration-300"></div>
                        
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-2 border-t border-gray-100">
                    <p className="text-[10px] text-center font-bold text-gray-400 uppercase tracking-tighter">
                      Click to Browse
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;


