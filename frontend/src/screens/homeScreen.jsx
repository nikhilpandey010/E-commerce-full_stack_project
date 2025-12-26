
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchProductList } from "../redux/slices/productSlice";
import ProductCarousel from "../components/productCarousel";
import Product from "../components/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/paginate";
import { BsArrowRight } from "react-icons/bs";
import CategorySection from "../components/CategorySection";


const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("API Base URL:", API_BASE_URL); 

const HomeScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList) || {};
  const { userDetails } = useSelector(state => state.user);
  const { products, loading, error, page, pages } = productList;
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || '';
  const pageNumber = searchParams.get("page") || "1";

  useEffect(() => {
    dispatch(fetchProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {!keyword && (
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Our Store</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}

      
      {!keyword && <ProductCarousel />}

    
      {!keyword && (
        <CategorySection/>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
          </h1>
          {!keyword && (
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
            >
              View all <BsArrowRight />
            </Link>
          )}
        </div>

        {loading ? (
          
            <Loader />
          
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          
          <>
            {/* The Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {Array.isArray(products) && products.map((product) => (
              <div key={product._id}>
              <Link 
                to={`/product/${product._id}`} 
                className="no-underline hover:no-underline focus:no-underline block"
                style={{ textDecoration: 'none' }} // Inline style for absolute override
              >
                <Product product={product} />
              </Link>
              </div>
            ))}
          </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <Paginate page={page} pages={pages}  />
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {!userDetails && (
        <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to find your perfect product?</h2>
            <p className="text-xl mb-8">
              Join our community of happy shoppers today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
              >
                Sign Up Now
              </Link>
              <Link
                to="/products"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-gray-900 transition duration-300"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;



