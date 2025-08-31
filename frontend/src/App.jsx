
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import Layout from "./layout";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/productScreen";
import ProfileScreen from "./screens/profileScreen";
import ShippingScreen from "./screens/shippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import OrderScreen from "./screens/orderScreen";
import CartScreen from "./screens/cartScreen"
import PlaceOrderScreen from "./screens/placeOrderScreen";


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>

      
      <Route path="/" element={<Layout/>}>
      <Route index element={<HomeScreen/>} />
      <Route path="/home" element={<HomeScreen/>} />
      <Route path="/:pageNumber" element={<HomeScreen/>} />  
      <Route path="/product/:id" element={<ProductScreen/>} />
       
      <Route path="/orderDetails/:id?" element={<OrderScreen/>} />    
  
      <Route path="/profile" element={<ProfileScreen/>} />
     <Route path="/payment" element={<PaymentScreen/>} />
     <Route path="/placeOrder" element={<PlaceOrderScreen/>} />
     <Route path="/shipping" element={<ShippingScreen/>} />
      <Route path="/cart/:id?" element={<CartScreen/>} />   
 
      
      </Route>
      <Route path="/login" element={<LoginScreen/>} />
      <Route path="/register" element={<RegisterScreen/>} />
      
     </Routes>
     
     
     </BrowserRouter>
    </>
  )
}

export default App;
