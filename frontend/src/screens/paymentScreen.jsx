
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, verifyPayment, resetPayment } from '../redux/slices/paymentSlice'
import CheckOutSteps from '../components/checkOutSteps'
import { useNavigate } from 'react-router-dom'
import { createMainOrder } from '../redux/slices/orderSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa'

function PaymentScreen({cart}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const payment = useSelector(state => state.payment)

 
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (Number(itemsPrice) + shippingPrice + taxPrice).toFixed(2);
  console.log("OrderSummary cart:", cart);



  const data = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: "RazorPay",
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString()
  }

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
    dispatch(createOrder(Number(totalPrice)))
  }

  // Open checkout after order created
  useEffect(() => {
    if (payment.status === 'succeeded' && payment.order && payment.key) {
      const options = {
        key: payment.key,
        amount: payment.order.amount,
        currency: payment.order.currency,
        order_id: payment.order.id,
        name: 'Your Store Name',
        description: 'Complete your purchase',
        image: '/logo.png', // Add your logo path
        handler: (response) => {
          dispatch(verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: payment.order.amount
          }))
        },
        theme: {
          color: '#2563eb' // Match your brand color
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
          dispatch(resetPayment())
          navigate("/order-success")
        })
        .catch(err => {
          console.error("Order creation failed:", err)
        })
    }
  }, [payment.verifyStatus, dispatch, navigate, data])

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
     
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <FaCreditCard className="mr-2 text-blue-500" /> Payment Method
        </h1>

        <div className="mb-8">
          <div className="flex items-center mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <input
              type="radio"
              id="razorpay"
              name="payment"
              value="RazorPay"
              checked
              readOnly
              className="h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="razorpay" className="ml-3 block text-gray-700">
              <span className="font-medium">RazorPay</span>
              <p className="text-sm text-gray-500 mt-1">
                Secure payment processing
              </p>
            </label>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Order Total:</span>
              <span className="font-bold text-lg">${totalPrice}</span>
            </div>
            <p className="text-sm text-gray-500 flex items-center">
              <FaLock className="mr-1" /> All transactions are secure and encrypted
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={payment.status === 'loading' || payment.verifyStatus === 'loading'}
            className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center ${
              payment.status === 'loading' || payment.verifyStatus === 'loading'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {payment.status === 'loading' ? (
              'Processing...'
            ) : payment.verifyStatus === 'loading' ? (
              <Loader size={5} />
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Pay ${totalPrice}
              </>
            )}
          </button>

          {payment.error && (
            <Message variant="danger" className="mt-4">
              Something went wrong. Please try again.
            </Message>
          )}
        </div>

        <div className="text-xs text-gray-500">
          <p>By completing your purchase, you agree to our Terms of Service.</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentScreen