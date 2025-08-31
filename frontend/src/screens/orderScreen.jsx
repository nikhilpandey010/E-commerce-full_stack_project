// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";
// import Message from "../components/Message";
// import Loader from "../components/Loader";



// const OrderScreen=()=>{

//     const dispatch =useDispatch();
//     const navigate = useNavigate();
//     const {id} = useParams();
//     console.log(id)
//     const [sdkReady ,setSdkReady] = useState();

//     const order = useSelector((state) =>state.order);
//     const {orderDetails , error , loading}= order;
//     console.log("get order details ",orderDetails);

//     const userLogin = useSelector((state)=> state.user);
//     const {userDetails} = userLogin;
    
//     // let updatedOrderDetails = orderDetails;



//     // if(updatedOrderDetails && updatedOrderDetails.orderItems && updatedOrderDetails.orderItems.length >0 )
//     // {
//     //     const itemsPrice = updatedOrderDetails.orderItems.reduce((acc,item)=> 
//     //         acc + item.price * item.qty ,0).toFixed(2);

//     //     updatedOrderDetails ={...updatedOrderDetails, itemsPrice};
//     // }

//     useEffect(()=>{
//         console.log("useEffect called for order details");
//         if(!userDetails)
//         {
//             navigate("/login");
//         }

//         else{
//             dispatch(getOrderDetails(id));
//         }
//     },[dispatch, navigate, userDetails, id]);
    

// // calculate the total price of each individual items .

//     // const calculateItemsPrice =()=>{
//     //     if(orderDetails.orderItems && orderDetails.orderItems.length >0)
//     //     {
//     //         return orderDetails.orderItems.reduce((total,item) =>{
//     //             const itemPrice = parseFloat(item.price) * item.qty;
//     //             return total + itemPrice;
//     //         },0)
//     //     }
//     //     return 0;

//     // };

// //call the calculatedItemsPrice to get the total price

// // const itemsPrice = calculateItemsPrice();

// // handelers 

// // const successPaymentHandler = (paymentResult) =>{
// //     dispatch(payOrder(orderDetails._id ,paymentResult));
// //     console.log(orderDetails._id)
// // };


    
//     return(
//         <>
//         {
//             loading ? (
//                 <Loader/>

//             ) : error ? (
//                 <Message varient="danger" >{error}</Message>
//             ): (
//                <div>
                
//                 {
                
//                    <>
//                     <h1>Order Items</h1>
//                     {orderDetails?.orderItems?.length === 0 && (
//                         <Message variant="info">Order is empty</Message>
//                     )}
//                     {orderDetails?.orderItems?.length > 0 && orderDetails.orderItems.map(item => (
                        
//                         <div key={item.product}>
//                         {item.image}
//                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                    
//                         <p>{item.qty} X {item.price} = {(item.qty * item.price).toFixed(2)} </p>

//                         </div>
                        
//                     ))}
//                     </>
                    
//                 }


               
//                 <h2>Order Details</h2>


//                 {
//                     orderDetails.user &&(
//                         <div>
//                             <p>Order-Id: {orderDetails._id}</p>
//                             <p>name : {orderDetails.user.name} </p>
//                             <p>email : {orderDetails.user.username } </p>
                           
//                         </div>

//                     )
//                 }

//                 {
//                     orderDetails.shippingAddress && (
//                         <div>
//                             <h1>Shipping Address</h1>
//                             <p>Address : {orderDetails.shippingAddress.address}</p>
//                             <p>City : {orderDetails.shippingAddress.city}</p>
//                             <p>Postal Code : {orderDetails.shippingAddress.postal_code}</p>
//                             <p>Country : {orderDetails.shippingAddress.country}</p>
//                         </div>
//                     )
//                 }


//                 {
//                     orderDetails.isDeliver ? (
//                         <Message varient="success">
//                             Delevered on{" "}
//                             {orderDetails.delever_at? orderDetails.delever_at.substring(0,10): null}
//                         </Message>
//                     ) :(
//                         <Message varient="warning">Not Delivered</Message>
//                     )

            
//                 }

//                 {
//                     orderDetails.is_paid ?(
//                         <Message varient="success">
//                             Paid {orderDetails.paid_at ? orderDetails.paid_at.substring(0,10) : null}
//                         </Message>
//                     ):(
//                         <Message varient="warning"> Not Paid </Message>
//                     )
//                 }

//                  <p>
//                     payment method : {orderDetails.payment_method}
//                 </p>

                    
//                 <h2>Order summery </h2>
//                 {
                    
//                     <p>Tax : {orderDetails.tax_price}</p>
                    
//                 }
//                 {
                    
//                     <p>Total: {orderDetails.total_price}</p>

//                 }
                
               

//                </div>
               
//             )
//         }


//         {/* {
//             !orderDetails.isPaid && (
//                 <>
//                 {loading && <Loader/> }
                
//                     {
//                         ! sdkReady ? (
//                             <Loader/>
//                         ) :(
//                             <button>Proceed to Pay</button>
//                             //payment button
//                         )
//                     }
                
//                 </>
//             )
//         } */}

        
        
//         </>
//     )
    
// }

// export default OrderScreen;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { FaBox, FaCheckCircle, FaTimesCircle, FaMoneyBillWave, FaTruck } from "react-icons/fa";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const order = useSelector((state) => state.order);
  const { orderDetails, error, loading } = order;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  useEffect(() => {
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, navigate, userDetails, id]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaBox className="mr-2 text-blue-500" /> Order Items
          </h2>

          {orderDetails?.orderItems?.length === 0 ? (
            <Message variant="info">Order is empty</Message>
          ) : (
            <div className="divide-y divide-gray-200">
              {orderDetails?.orderItems?.map((item) => (
                <div key={item.product} className="py-4 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      // e.target.src = "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />
                  <div className="flex-grow">
                    <Link
                      to={`/product/${item.product}`}
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

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Shipping Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            {orderDetails.user && (
              <div className="mb-4">
                <p className="font-medium">Customer:</p>
                <p>{orderDetails.user.name}</p>
                <p>{orderDetails.user.username}</p>
              </div>
            )}

            {orderDetails.shippingAddress && (
              <div className="mb-4">
                <p className="font-medium">Address:</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postal_code}
                </p>
                <p>{orderDetails.shippingAddress.country}</p>
              </div>
            )}

            <div className="flex items-center mb-2">
              {orderDetails.isDelivered ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTruck className="text-yellow-500 mr-2" />
              )}
              <span>
                {orderDetails.isDelivered
                  ? `Delivered on ${orderDetails.delivered_at?.substring(0, 10) || 'unknown date'}`
                  : "Not Delivered"}
              </span>
            </div>

            <div className="flex items-center">
              {orderDetails.is_paid ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              <span>
                {orderDetails.is_paid
                  ? `Paid on ${orderDetails.paid_at?.substring(0, 10) || 'unknown date'}`
                  : "Not Paid"}
              </span>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-500" /> Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${orderDetails.itemsPrice?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${orderDetails.shippingPrice?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${orderDetails.taxPrice?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 mt-3 font-bold text-lg">
                <span>Total:</span>
                <span>${orderDetails.totalPrice?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Payment Method: {orderDetails.payment_method || 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;