import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyNowProduct, createReview, fetchProductDetails } from "../redux/slices/productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addTocart } from "../redux/slices/cartSlice";
import { FaArrowLeft, FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.product.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const productReviewCreate = useSelector((state) => state.product.createReview);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview || errorProductReview) {
      setRating(0);
      setComment("");
    }
    dispatch(fetchProductDetails(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addTocart(id, qty));
  };

  const buyNowHandler = () => {
    // navigate(`/shipping`);
    dispatch(buyNowProduct(product));
    navigate('/checkOutPage')

  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(id, { rating, comments: comment }));
  };

  console.log(product.image)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Product Details */}
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.numReviews} reviews
                </span>
              </div>

              <div className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price}
              </div>

              <p className="text-gray-700 mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.countInStock > 0 ? (
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Add to Cart */}
              {product.countInStock > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <label className="mr-2 text-gray-700">Qty:</label>
                    <select
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="border border-gray-300 rounded px-3 py-2"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={addToCartHandler}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button
                      onClick={buyNowHandler}
                      className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
                    >
                      <FaBolt className="mr-2" />
                      Buy Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>

            {product.reviews.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-lg">{review.name}</strong>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comments}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Review Form */}
            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Write a Review
              </h3>

              {loadingProductReview && <Loader />}
              {successProductReview && (
                <Message variant="success">Review Submitted</Message>
              )}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}

              {userDetails ? (
                <form onSubmit={submitHandler} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="1">Poor</option>
                      <option value="2">Fair</option>
                      <option value="3">Good</option>
                      <option value="4">Very Good</option>
                      <option value="5">Excellent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
                  >
                    Submit Review
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login" className="text-blue-600 hover:underline">Login</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;

