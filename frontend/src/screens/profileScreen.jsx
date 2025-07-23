import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, listMyOrders } from "../redux/slices/orderSlice";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


const ProfileScreen=()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email , setEmail] = useState("");
    const [message, setMessage] = useState("");
    
    const user = useSelector((state)=> state.user);
    const {userDetails , loading , error}  = user;
    const userData = {
        id : userDetails.id,
        // name: userDetails._id,
        name : name ,
        email: email,
        // password: password,
    };

    const order = useSelector((state) => state.order);
    const {listOrder, loading:loadingOrders , error: errorOrders } = order;
    console.log(listOrder);


    useEffect(()=>{
        if(!userDetails ){
            navigate('/login');

        }else{
           
            dispatch(listMyOrders());
        

            setName(userDetails.name);
            setEmail(userDetails.username);
        }
    },[dispatch,navigate,userDetails,error]);

    const submitHandlers =(e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            setMessage("password do not match")
        }else{
            dispatch(updateUser(userDetails.id,userData));
            console.log(userData)
            setMessage("");
        }
    };

    const handleDeleteUser =()=>{
        // call the deleteUser action from userSlice

        dispatch(deleteUser(userDetails.id));
        navigate('/');
        window.location.reload() ; // reload the page...
    }


    
    return(
        <>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{error}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}

            <form action="">
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <button type="submit" onClick={submitHandlers}> save</button>


                


            </form>

            <button type="submit" onClick={handleDeleteUser}>Delete User</button>


            <div>
                <h2>My orders</h2>
                {loadingOrders ? (
                    <Loader/>
                    
                ): errorOrders ? (
                    <Message variant="danger" >{errorOrders}</Message>
                ):(
                    <table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder
                        .map(o => (
                            <tr key={o._id}>
                            <td>{o._id}</td>
                            <td>{o.created_at?.substring(0, 10)}</td>
                            <td>{o.total_price}</td>
                            <td>{o.paid_at?.substring(0, 10)}</td>
                            <td>
                                <Link to={`/orderDetails/${o._id}`}>
                                <button>Details</button>
                                </Link>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>

                   
                )
                }
            </div>

        
        
        </>
    )
    
}

export default ProfileScreen;