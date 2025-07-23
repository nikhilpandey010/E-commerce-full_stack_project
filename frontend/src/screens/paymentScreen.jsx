// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// import CheckOutSteps from "../components/checkOutSteps";


// const PaymentScreen=()=>{
//     const dispatch = useDispatch();
//     // navigate = useNavigate();
//     const cart = useSelector((state) =>state.cart);
//     const {shippingAddress} = cart;

//     // STATE
//     const [paymentMethod, setPaymentMethod] = useState("RazorPay");

//     // if no shipping address then redirect to shipping address screen

//     if (! shippingAddress.address){
//         navigate("/shipping");
//     }

//     // HANDLERS

    

//     const submitHandlers = (e) =>{
//         e.preventDefault();

//         // dispatch(savePaymentMethod(paymentMethod));
//         // navigate('/placeorder');
//     }
    
//     return(
//         <>

//         <CheckOutSteps step1 step2 step3 step4 />

//         <input type="radio" label="RazorPay or credit cart" onChange={(e)=>{setPaymentMethod(e.target.value)}} />
        
        
//         </>
//     )
    
// }

// export default PaymentScreen;


import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, verifyPayment, resetPayment } from '../redux/slices/paymentSlice'
import CheckOutSteps from '../components/CheckOutSteps'
import { useNavigate } from 'react-router-dom'
import { createMainOrder } from '../redux/slices/orderSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import Message from '../components/Message'
import Loader from '../components/Loader'

function PaymentScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const payment = useSelector(state => state.payment)


const cart = useSelector((state)=> state.cart);
const itemsPrice = cart.cartItems.reduce(
        (acc,item)=>acc + item.price * item.qty ,0
    );

const shippingPrice = itemsPrice >100 ? 0 : 10;
    const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
    const totalPrice =(
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice) 

      

    ).toFixed(2);
    


const data ={
orderItems : cart.cartItems,
shippingAddress: cart.shippingAddress,
// paymentMethod: cart.paymentMethod,
paymentMethod: "RazorPay",
itemsPrice: itemsPrice.toFixed(2).toString(),
shippingPrice: shippingPrice.toFixed(2).toString(),
taxPrice: taxPrice.toFixed(2).toString(),
totalPrice: totalPrice.toString()
};

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     return navigate('/shipping')
  //   }
  // }, [shippingAddress, navigate])

  // Load Razorpay SDK
  useEffect(() => {
    const scriptId = 'razorpay-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
    }
  }, [])

  const handlePayment = () => {
    dispatch(createOrder(Number(totalPrice))) // ₹100; customize amount
  }

  // Open checkout after order created
  useEffect(() => {
    if (payment.status === 'succeeded' && payment.order && payment.key) {
      const options = {
        key: payment.key,
        amount: payment.order.amount,
        currency: payment.order.currency,
        order_id: payment.order.id,
        handler: (response) => {
          dispatch(verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: payment.order.amount
          }))
        }
      }
      new window.Razorpay(options).open()
    }
  }, [payment.status, payment.order, payment.key, dispatch])

  

useEffect(() => {
  if (payment.verifyStatus === 'succeeded') {
    dispatch(createMainOrder(data))
  .unwrap()
  .then(order => {
    console.log("Order created:", order);
    dispatch(resetPayment());
    navigate("/");
  })
  .catch(err => {
    console.error("Order creation failed:", err);
  });
  }
}, [payment.verifyStatus, dispatch, navigate, data]);





  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <h2>Select Payment Method</h2>
      <div>
        <input type="radio" value="RazorPay" checked readOnly /> RazorPay
      </div>
      <button onClick={handlePayment} disabled={payment.status === 'loading'}>
        Pay {totalPrice}
      </button>
      {payment.status === 'loading' && <p>Creating order...</p>}
      {payment.verifyStatus === 'loading' && <Loader/>}
      {payment.error && <Message variant='danger'>"Something Wrong please Try again "</Message>}
    </>
  )
}

export default PaymentScreen;



