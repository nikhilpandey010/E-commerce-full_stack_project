// import { useDispatch, useSelector } from "react-redux";
// import { removeFromCart } from "../redux/slices/cartSlice";
// import Message from "../components/Message";
// import { Link, useNavigate } from "react-router-dom";


// const CartScreen=()=>{
//     const dispatch = useDispatch();
//     const navigate= useNavigate()

//     const cart = useSelector((state) => state.cart);
//     const {cartItems} = cart;
//     console.log("cartItems",cartItems) ;

//     const removeFromCartHandler =(id) =>{
//         dispatch(removeFromCart(id));
//     };

//     const checkOutHandler=()=>{
//         // history.push("/login?redirect=shipping");
//         navigate("/shipping")
//     }
//     let total =0;
//     const answer = cartItems.map((item)=>{
//         total= total + (item.price * item.qty)
//         return(
       
//         <tr key ={item._id}>
//         <td><img src={item.image} alt={item.name} /></td>
//         <td><Link to={`/product/${item._id}`}>{item.name }</Link></td>
//         <td>{item.qty} </td>
//         <td>{item.price}</td>
//         <td>{item.price * item.qty}.00</td>
//         <td>
//             <button onClick={()=>{removeFromCartHandler(item._id)}}>Remove Item</button>
//         </td>

//         </tr>

        
//         )
    
//     })
//     return(
//         <>

//         <h1>Shopping Cart</h1>
//         {
//             cartItems.length == 0 ? (
//                 <Message variant ="info">Your cart is empty <Link to="/">Go back</Link></Message>
                
//             ):(
//                 <table>
//                     <thead>
//                         <tr>
//                     <th>Image</th>
//                     <th>Product Name</th>
//                     <th>Product qunatity</th>
//                     <th>Price</th>
//                     <th>Total</th>
//                     <th>Remove</th>
//                     </tr>

//                     </thead>
//                     <tbody>
//                         {answer}
//                     </tbody>
                    
//                     <h1>Total cost = {total}</h1>
//                    <button onClick={()=>{checkOutHandler()}}>Check out</button>
//                 </table>
                 

               
//             )
           
//         }
        
//         </>
//     )
    
// }

// export default CartScreen;


import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaShoppingBag } from "react-icons/fa";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
     navigate("/shipping");
    // if(userDetails)
    // {
    //   navigate("/shipping");
    // }
    // else
    // {
    //   navigate("/login?redirect=/shipping");
    // }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shippingFee = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaShoppingBag className="mr-2" /> Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <Message variant="info">
          Your cart is empty <Link to="/" className="text-blue-600 hover:underline flex items-center">
            <FaArrowLeft className="mr-1" /> Go back
          </Link>
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Subtotal</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/100?text=No+Image";
                        }}
                      />
                      <Link 
                        to={`/product/${item._id}`} 
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-4">${item.price}</td>
                  <td className="py-4 px-4">{item.qty}</td>
                  <td className="py-4 px-4">${(item.price * item.qty).toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </Link>
              <button
                onClick={checkOutHandler}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;