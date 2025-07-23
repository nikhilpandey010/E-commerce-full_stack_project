import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { createOrder } from "../redux/slices/orderSlice";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";


const PlaceOrderScreen=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const order = useSelector((state)=> state.order);
    // const {orderDetails , loading , error} = order;
    const cart = useSelector((state)=> state.cart);
    console.log(cart)

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

    // if(! cart.paymentMethod){
    //     Navigate("/payment");
    // }

    const data ={
        orderItems : cart.cartItems,
        shippingAddress: cart.shippingAddress,
        // paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2).toString(),
        shippingPrice: shippingPrice.toFixed(2).toString,
        taxPrice: taxPrice.toFixed(2).toString(),
        totalPrice: totalPrice.toString()
    };

    const placeOrder =()=>{
    //     dispatch(createOrder(data)).then(()=>{
    //         setTimeout(()=>{
    //             console.log(orderDetails)
    //             navigate("/orderDetails");
    //         },1000); // Delay of 1 sec  (1000 milisecond)
    //     }

    //     ).catch((error) =>{
    //         // handel any error that occour suring order creation 
    //     })

            navigate("/payment")
    }

    
    
    return(
        <>

        <CheckOutSteps step1 step2 step3   />

        <h2>Shipping</h2>
        <p>
            shipping Address:
            {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
            {cart.shippingAddress.postalCode},{" "}
            {cart.shippingAddress.country}
        </p>
        <h2>Payment</h2>
        {/* <p>
            Payment Method : {cart.paymentMethod}
        </p> */}
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ?(
            <Message variant="info">Your cart is empty</Message>
        ):(
            cart.cartItems.map((item) =>(
                <div key={item._id}>
                <img src={item.image} alt={item.name} />
                {item.name}
                <p>
                {item.qty} X {item.price} = {(item.qty * item.price ).toFixed(2)}               
                </p>
                </div>
            ))
        )}

        <h2>Order summery</h2>
        <p>Items : {itemsPrice.toFixed(2)}</p>
        <p>Shipping : {shippingPrice.toFixed(2)}</p>
        <p>Tax : {taxPrice}</p>
        <p>Total : {totalPrice}</p>

        {/* <p>{error && <Message variant="danger">{error}</Message>}</p> */}

        <button onClick={placeOrder}>Place Order</button>



        </>
    )
    
}

export default PlaceOrderScreen;