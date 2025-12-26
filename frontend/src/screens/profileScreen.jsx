// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderDetails, listMyOrders } from "../redux/slices/orderSlice";
// import { deleteUser, updateUser } from "../redux/slices/userSlice";
// import Message from "../components/Message";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";


// const ProfileScreen=()=>{
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [name, setName] = useState("");
//     const [email , setEmail] = useState("");
//     const [message, setMessage] = useState("");

//     const user = useSelector((state)=> state.user);
//     const {userDetails , loading , error}  = user;
//     const userData = {
//         id : userDetails.id,
//         // name: userDetails._id,
//         name : name ,
//         email: email,
//         // password: password,
//     };

//     const order = useSelector((state) => state.order);
//     const {listOrder, loading:loadingOrders , error: errorOrders } = order;
//     console.log(listOrder);


//     useEffect(()=>{
//         if(!userDetails ){
//             navigate('/login');

//         }else{

//             dispatch(listMyOrders());


//             setName(userDetails.name);
//             setEmail(userDetails.username);
//         }
//     },[dispatch,navigate,userDetails,error]);

//     const submitHandlers =(e)=>{
//         e.preventDefault();

//         if(password !== confirmPassword){
//             setMessage("password do not match")
//         }else{
//             dispatch(updateUser(userDetails.id,userData));
//             console.log(userData)
//             setMessage("");
//         }
//     };

//     const handleDeleteUser =()=>{
//         // call the deleteUser action from userSlice

//         dispatch(deleteUser(userDetails.id));
//         navigate('/');
//         window.location.reload() ; // reload the page...
//     }



//     return(
//         <>
//             <h2>User Profile</h2>
//             {message && <Message variant="danger">{error}</Message>}
//             {error && <Message variant="danger">{error}</Message>}
//             {loading && <Loader/>}

//             <form action="">
//                 <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
//                 <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
//                 <button type="submit" onClick={submitHandlers}> save</button>





//             </form>

//             <button type="submit" onClick={handleDeleteUser}>Delete User</button>


//             <div>
//                 <h2>My orders</h2>
//                 {loadingOrders ? (
//                     <Loader/>

//                 ): errorOrders ? (
//                     <Message variant="danger" >{errorOrders}</Message>
//                 ):(
//                     <table>
//                     <thead>
//                         <tr>
//                         <th>ID</th>
//                         <th>Date</th>
//                         <th>Total</th>
//                         <th>Delivered</th>
//                         <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {listOrder
//                         .map(o => (
//                             <tr key={o._id}>
//                             <td>{o._id}</td>
//                             <td>{o.created_at?.substring(0, 10)}</td>
//                             <td>{o.total_price}</td>
//                             <td>{o.paid_at?.substring(0, 10)}</td>
//                             <td>
//                                 <Link to={`/orderDetails/${o._id}`}>
//                                 <button>Details</button>
//                                 </Link>
//                             </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                     </table>


//                 )
//                 }
//             </div>



//         </>
//     )

// }

// export default ProfileScreen;



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, listMyOrders } from "../redux/slices/orderSlice";
import { deleteUser, logout, updateUser } from "../redux/slices/userSlice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FaUserEdit, FaTrash, FaHistory, FaInfoCircle, FaSave } from "react-icons/fa";
import { FaSignOutAlt } from 'react-icons/fa';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    const user = useSelector((state) => state.user);
    const { userDetails, loading, error } = user;

    const order = useSelector((state) => state.order);
    const { listOrder, loading: loadingOrders, error: errorOrders } = order;

    useEffect(() => {
        if (!userDetails) {
            navigate('/login');
        } else {
            dispatch(listMyOrders());
            setName(userDetails.name);
            setEmail(userDetails.username);
            // setProfileImage(userDetails.profile);
        }
    }, [dispatch, navigate, userDetails]);

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            id: userDetails.id,
            name: name,
            email: email,
            profileImage: profileImage
        };
        dispatch(updateUser(userData));
        setIsEditing(false);
    };

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const handleDeleteUser = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            dispatch(deleteUser(userDetails.id));
            navigate('/');
        }
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Profile</h1>

                {/* Profile Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Profile Card */}
                    <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative mb-4">
                              
                                {isEditing && (
                                    <div className="absolute bottom-0 right-0">
                                        <label className="bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </label>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-semibold">{userDetails?.name}</h2>
                            <p className="text-gray-600">{userDetails?.username}</p>
                        </div>

                        {message && <Message variant="danger">{message}</Message>}
                        {error && <Message variant="danger">{error}</Message>}

                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full p-2 border rounded ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-100'}`}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full p-2 border rounded ${isEditing ? 'border-gray-300' : 'border-transparent bg-gray-100'}`}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-3">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="submit"
                                                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                                            >
                                                <FaSave className="mr-2" /> Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                                        >
                                            <FaUserEdit className="mr-2" /> Edit Profile
                                        </button>
                                    )}
                                </div>
                                


                            </div>

                            <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
                            {/* Profile content (image, form, etc.) */}

                            {/* Bottom-left buttons */}
                            <div className="mt-auto flex space-x-4">
                                
                                <button
                                onClick={handleLogout}
                                className="flex-1 flex items-center justify-center text-red-600 hover:text-red-800 font-medium border border-red-600 rounded-lg py-2"
                                >
                                <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                                <button
                                onClick={handleDeleteUser}
                                className="flex-1 flex items-center justify-center text-red-600 hover:text-red-800 font-medium border border-red-600 rounded-lg py-2"
                                >
                                <FaTrash className="mr-2" /> Delete Account
                                </button>

                            </div>
                            </div>

                        </form>

                     




                    </div>

                    {/* Orders Section */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-6 flex items-center">
                                <FaHistory className="mr-2 text-blue-500" /> My Orders
                            </h2>

                            {loadingOrders ? (
                                <Loader />
                            ) : errorOrders ? (
                                <Message variant="danger">{errorOrders}</Message>
                            ) : listOrder.length === 0 ? (
                                <Message variant="info">You haven't placed any orders yet.</Message>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {listOrder.map((order) => (
                                                <tr key={order._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order._id ? order._id + '...' : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        ${order.total_price ? order.total_price : '0.00'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {order.isDelivered ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Delivered
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                Processing
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <Link
                                                            to={`/orderDetails/${order._id || ''}`}
                                                            className="flex items-center text-blue-600 hover:text-blue-800"
                                                        >
                                                            <FaInfoCircle className="mr-1" /> Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;


