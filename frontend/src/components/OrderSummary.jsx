import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const OrderSummary = ({ cart, onNext, onBack }) => {
  // Calculations
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (Number(itemsPrice) + shippingPrice + taxPrice).toFixed(2);
  console.log("OrderSummary cart:", cart);

  const placeOrder=()=>{
    onNext();
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          
           
                      
                      {cart.cartItems.length === 0 ? (
                        <Message variant="info">Your cart is empty</Message>
                      ) : (
                        <div className="divide-y divide-gray-200">
                          {cart.cartItems.map((item) => (
                            <div key={item._id} className="py-4 flex items-center">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-16 object-cover rounded mr-4"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://via.placeholder.com/100?text=No+Image";
                                }}
                              />
                              <div className="flex-grow">
                                <Link 
                                  to={`/product/${item._id}`} 
                                  className="text-blue-600 hover:underline font-medium"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-gray-600">
                                  {item.qty} × ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
        
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-purple-500" /> Order Summary
          </h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>${itemsPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8.2%):</span>
              <span>${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3 font-bold text-lg">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300"
          >
            Proceed to Payment
          </button>
        </div>



    </div>
  );
};

export default OrderSummary;