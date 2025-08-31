// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { saveShippingAddress, setShippingAddress } from "../redux/slices/cartSlice";
// import CheckOutSteps from "../components/CheckOutSteps";



// const ShippingScreen=()=>{
//     const cart = useSelector((state) => state.cart);

//     const {shippingAddress} = cart ;

//     const[address ,setAddress] = useState(shippingAddress.address);
//     const [city,setCity] = useState(shippingAddress.city);
//     const[postalCode,setPostalCode] =useState(shippingAddress.postalCode);
//     const[country,setCountry] = useState(shippingAddress.country);

//     const dispatch=useDispatch();
//     const navigate= useNavigate();
//     //HANDLERS

//     const submitHandlers =(e) =>{
//         e.preventDefault();

//         dispatch(saveShippingAddress({address,city,postalCode,country}));

//         // navigate('./payment');
//         navigate("/placeOrder");
    
    
//     };
    
//     return(
//         <>
        

//         <CheckOutSteps step1 step2 />

//         <h1>shipping</h1>
//         <form >

//             Address: <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
//             City: <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} />
//             Postal code: <input type="text" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} />
//             Country: <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} />
           

//             <button type="submit" onClick={submitHandlers}>submit</button>
//         </form>
    
//         </>
//     )
    
// }

// export default ShippingScreen;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import CheckOutSteps from "../components/checkOutSteps";


const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeOrder");
  };

 useEffect(() => {
    if (!userDetails) {
      navigate("/login?redirect=/shipping");
    }
   }, []);
 
 

  return (
    
    
    <div className="container mx-auto px-4 py-8 max-w-md">
      <CheckOutSteps step1 step2  />
      
      <h1 className="text-2xl font-bold mb-6 text-center">Shipping Address</h1>
      
      <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-300"
        >
          Continue to Order Summary
        </button>
      </form>
    </div>
    
    
  );
};

export default ShippingScreen;