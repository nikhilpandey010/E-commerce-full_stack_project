import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";


const CartScreen=()=>{
    const dispatch = useDispatch();
    const navigate= useNavigate()

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    console.log("cartItems",cartItems) ;

    const removeFromCartHandler =(id) =>{
        dispatch(removeFromCart(id));
    };

    const checkOutHandler=()=>{
        // history.push("/login?redirect=shipping");
        navigate("/shipping")
    }
    let total =0;
    const answer = cartItems.map((item)=>{
        total= total + (item.price * item.qty)
        return(
       
        <tr key ={item._id}>
        <td><img src={item.image} alt={item.name} /></td>
        <td><Link to={`/product/${item._id}`}>{item.name }</Link></td>
        <td>{item.qty} </td>
        <td>{item.price}</td>
        <td>{item.price * item.qty}.00</td>
        <td>
            <button onClick={()=>{removeFromCartHandler(item._id)}}>Remove Item</button>
        </td>

        </tr>

        
        )
    
    })
    return(
        <>

        <h1>Shopping Cart</h1>
        {
            cartItems.length == 0 ? (
                <Message variant ="info">Your cart is empty <Link to="/">Go back</Link></Message>
                
            ):(
                <table>
                    <thead>
                        <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Product qunatity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Remove</th>
                    </tr>

                    </thead>
                    <tbody>
                        {answer}
                    </tbody>
                    
                    <h1>Total cost = {total}</h1>
                   <button onClick={()=>{checkOutHandler()}}>Check out</button>
                </table>
                 

               
            )
           
        }
        
        </>
    )
    
}

export default CartScreen;