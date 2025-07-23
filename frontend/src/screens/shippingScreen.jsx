import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, setShippingAddress } from "../redux/slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";



const ShippingScreen=()=>{
    const cart = useSelector((state) => state.cart);

    const {shippingAddress} = cart ;

    const[address ,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const[postalCode,setPostalCode] =useState(shippingAddress.postalCode);
    const[country,setCountry] = useState(shippingAddress.country);

    const dispatch=useDispatch();
    const navigate= useNavigate();
    //HANDLERS

    const submitHandlers =(e) =>{
        e.preventDefault();

        dispatch(saveShippingAddress({address,city,postalCode,country}));

        // navigate('./payment');
        navigate("/placeOrder");
    
    
    };
    
    return(
        <>
        

        <CheckOutSteps step1 step2 />

        <h1>shipping</h1>
        <form >

            Address: <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
            City: <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} />
            Postal code: <input type="text" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} />
            Country: <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} />
           

            <button type="submit" onClick={submitHandlers}>submit</button>
        </form>
    
        </>
    )
    
}

export default ShippingScreen;