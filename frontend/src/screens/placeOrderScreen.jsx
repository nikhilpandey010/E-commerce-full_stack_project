// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// // import { createOrder } from "../redux/slices/orderSlice";
// import CheckOutSteps from "../components/CheckOutSteps";
// import Message from "../components/Message";


// const PlaceOrderScreen=()=>{
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // const order = useSelector((state)=> state.order);
//     // const {orderDetails , loading , error} = order;
//     const cart = useSelector((state)=> state.cart);
//     console.log(cart)

//     const itemsPrice = cart.cartItems.reduce(
//         (acc,item)=>acc + item.price * item.qty ,0
//     );

//     const shippingPrice = itemsPrice >100 ? 0 : 10;
//     const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
//     const totalPrice =(
//         Number(itemsPrice) +
//         Number(shippingPrice) +
//         Number(taxPrice) 


//     ).toFixed(2);

//     // if(! cart.paymentMethod){
//     //     Navigate("/payment");
//     // }

//     const data ={
//         orderItems : cart.cartItems,
//         shippingAddress: cart.shippingAddress,
//         // paymentMethod: cart.paymentMethod,
//         itemsPrice: itemsPrice.toFixed(2).toString(),
//         shippingPrice: shippingPrice.toFixed(2).toString,
//         taxPrice: taxPrice.toFixed(2).toString(),
//         totalPrice: totalPrice.toString()
//     };

//     const placeOrder =()=>{
//     //     dispatch(createOrder(data)).then(()=>{
//     //         setTimeout(()=>{
//     //             console.log(orderDetails)
//     //             navigate("/orderDetails");
//     //         },1000); // Delay of 1 sec  (1000 milisecond)
//     //     }

//     //     ).catch((error) =>{
//     //         // handel any error that occour suring order creation 
//     //     })

//             navigate("/payment")
//     }

    
    
//     return(
//         <>

//         <CheckOutSteps step1 step2 step3   />

//         <h2>Shipping</h2>
//         <p>
//             shipping Address:
//             {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
//             {cart.shippingAddress.postalCode},{" "}
//             {cart.shippingAddress.country}
//         </p>
//         <h2>Payment</h2>
//         {/* <p>
//             Payment Method : {cart.paymentMethod}
//         </p> */}
//         <h2>Order Items</h2>
//         {cart.cartItems.length === 0 ?(
//             <Message variant="info">Your cart is empty</Message>
//         ):(
//             cart.cartItems.map((item) =>(
//                 <div key={item._id}>
//                 <img src={item.image} alt={item.name} />
//                 {item.name}
//                 <p>
//                 {item.qty} X {item.price} = {(item.qty * item.price ).toFixed(2)}               
//                 </p>
//                 </div>
//             ))
//         )}

//         <h2>Order summery</h2>
//         <p>Items : {itemsPrice.toFixed(2)}</p>
//         <p>Shipping : {shippingPrice.toFixed(2)}</p>
//         <p>Tax : {taxPrice}</p>
//         <p>Total : {totalPrice}</p>

//         {/* <p>{error && <Message variant="danger">{error}</Message>}</p> */}

//         <button onClick={placeOrder}>Place Order</button>



//         </>
//     )
    
// }

// export default PlaceOrderScreen;


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/checkOutSteps";
import Message from "../components/Message";
import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, 0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrder = () => {
    navigate("/payment");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <CheckOutSteps step1 step2 step3 />
      
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaShoppingBag className="mr-2" /> Order Summary
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Shipping and Payment Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Shipping
            </h2>
            <p className="text-gray-700">
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCreditCard className="mr-2 text-green-500" /> Payment
            </h2>
            <p className="text-gray-700">
              {/* {cart.paymentMethod || "Not selected"} */}
              Payment method will be selected in next step
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
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


        {/* Order Summary */}
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
    </div>
  );
};

export default PlaceOrderScreen;