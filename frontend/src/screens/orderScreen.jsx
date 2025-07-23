import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";



const OrderScreen=()=>{

    const dispatch =useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id)
    const [sdkReady ,setSdkReady] = useState();

    const order = useSelector((state) =>state.order);
    const {orderDetails , error , loading}= order;
    console.log("get order details ",orderDetails);

    const userLogin = useSelector((state)=> state.user);
    const {userDetails} = userLogin;
    
    // let updatedOrderDetails = orderDetails;



    // if(updatedOrderDetails && updatedOrderDetails.orderItems && updatedOrderDetails.orderItems.length >0 )
    // {
    //     const itemsPrice = updatedOrderDetails.orderItems.reduce((acc,item)=> 
    //         acc + item.price * item.qty ,0).toFixed(2);

    //     updatedOrderDetails ={...updatedOrderDetails, itemsPrice};
    // }

    useEffect(()=>{
        console.log("useEffect called for order details");
        if(!userDetails)
        {
            navigate("/login");
        }

        else{
            dispatch(getOrderDetails(id));
        }
    },[dispatch, navigate, userDetails, id]);
    

// calculate the total price of each individual items .

    // const calculateItemsPrice =()=>{
    //     if(orderDetails.orderItems && orderDetails.orderItems.length >0)
    //     {
    //         return orderDetails.orderItems.reduce((total,item) =>{
    //             const itemPrice = parseFloat(item.price) * item.qty;
    //             return total + itemPrice;
    //         },0)
    //     }
    //     return 0;

    // };

//call the calculatedItemsPrice to get the total price

// const itemsPrice = calculateItemsPrice();

// handelers 

// const successPaymentHandler = (paymentResult) =>{
//     dispatch(payOrder(orderDetails._id ,paymentResult));
//     console.log(orderDetails._id)
// };


    
    return(
        <>
        {
            loading ? (
                <Loader/>

            ) : error ? (
                <Message varient="danger" >{error}</Message>
            ): (
               <div>
                
                {
                
                   <>
                    <h1>Order Items</h1>
                    {orderDetails?.orderItems?.length === 0 && (
                        <Message variant="info">Order is empty</Message>
                    )}
                    {orderDetails?.orderItems?.length > 0 && orderDetails.orderItems.map(item => (
                        
                        <div key={item.product}>
                        {item.image}
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                    
                        <p>{item.qty} X {item.price} = {(item.qty * item.price).toFixed(2)} </p>

                        </div>
                        
                    ))}
                    </>
                    
                }


               
                <h2>Order Details</h2>


                {
                    orderDetails.user &&(
                        <div>
                            <p>Order-Id: {orderDetails._id}</p>
                            <p>name : {orderDetails.user.name} </p>
                            <p>email : {orderDetails.user.username } </p>
                           
                        </div>

                    )
                }

                {
                    orderDetails.shippingAddress && (
                        <div>
                            <h1>Shipping Address</h1>
                            <p>Address : {orderDetails.shippingAddress.address}</p>
                            <p>City : {orderDetails.shippingAddress.city}</p>
                            <p>Postal Code : {orderDetails.shippingAddress.postal_code}</p>
                            <p>Country : {orderDetails.shippingAddress.country}</p>
                        </div>
                    )
                }


                {
                    orderDetails.isDeliver ? (
                        <Message varient="success">
                            Delevered on{" "}
                            {orderDetails.delever_at? orderDetails.delever_at.substring(0,10): null}
                        </Message>
                    ) :(
                        <Message varient="warning">Not Delivered</Message>
                    )

            
                }

                {
                    orderDetails.is_paid ?(
                        <Message varient="success">
                            Paid {orderDetails.paid_at ? orderDetails.paid_at.substring(0,10) : null}
                        </Message>
                    ):(
                        <Message varient="warning"> Not Paid </Message>
                    )
                }

                 <p>
                    payment method : {orderDetails.payment_method}
                </p>

                    
                <h2>Order summery </h2>
                {
                    
                    <p>Tax : {orderDetails.tax_price}</p>
                    
                }
                {
                    
                    <p>Total: {orderDetails.total_price}</p>

                }
                
               

               </div>
               
            )
        }


        {/* {
            !orderDetails.isPaid && (
                <>
                {loading && <Loader/> }
                
                    {
                        ! sdkReady ? (
                            <Loader/>
                        ) :(
                            <button>Proceed to Pay</button>
                            //payment button
                        )
                    }
                
                </>
            )
        } */}

        
        
        </>
    )
    
}

export default OrderScreen;