import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createReview, fetchProductDetails } from "../redux/slices/productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {addTocart} from "../redux/slices/cartSlice"




const ProductScreen=()=>{
    const [qty, setQty] = useState("1");
    const [rating,setRating] =useState(0);
    const [comment,setComment] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const productDetails = useSelector((state)=> state.product.productDetails);
    const {product , loading , error} = productDetails;
    console.log(productDetails);

    const userLogin = useSelector((state)=> state.user);
    const {userDetails,} = userLogin ;


    const productReviewCreate = useSelector((state)=> state.product.createReview);
    console.log("product review create88888888",productReviewCreate)
    const {loading: loadingProductReview , error:errorProductReview , success:successProductReview} = productReviewCreate;

    useEffect(()=>{
        // If review successfully submited , reset

        if(successProductReview || errorProductReview){
            setRating(0);
            setComment("");
        }

        dispatch(fetchProductDetails(id));
    },[dispatch, id, successProductReview])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`);
        dispatch(addTocart(id, qty));
        

    }

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(createReview(id, {'rating':rating,'comments':comment}));
    };
    return(
        <>
     

        <Link to="/">Go back</Link>

        {
            loading ? (
                <Loader/>
            ): error ?(
                <Message variant="danger">{error}</Message>
            ) : (
            
                <div>
                    <div>
                        <img src={product.image} alt={product.name} />

                   <h1> {product.name}</h1>
                   <h1> {product.price}</h1>

                   <p>Description: {product.description}  </p>
                    </div>

                
                    {/* <Rating 
                    value={product.rating}
                    text={`${product.numReviews}reviews`} /> */}

                    {
                    product.countInStock > 0 ?  <h4>In stock</h4>  : <h4>Out of stock</h4>
                    } 

                        <input type="number" value={qty} onChange={(e)=>{setQty(e.target.value)}} /> 

                         {<button onClick={addToCartHandler}>Add to cart</button>} 


                        <h1>Reviews</h1>

                       {product.reviews.length == 0 ? <Message>No Reviews</Message> : (
                            
                            product.reviews.map((review) => (
                            <div key={review._id}>
                            <strong>{review.name}</strong>
                            <div>Rating: {review.rating}</div>
                            <div>{review.comments}</div> 
                            <hr />
                            </div>
                        ))
                            


                    )
                    
                        }    

                        


                     
                            <h1>Write a review</h1>
                            {loadingProductReview && <Loader />}
                            {successProductReview && (
                                <Message variant="success">Review Submited</Message>
                            )}

                            {errorProductReview &&(
                                <Message variant="danger">{errorProductReview}</Message>
                            )}
                            { userDetails? (
                                <form  onSubmit={submitHandler}>

                                <select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
                                    
                                    <option value="">Select...</option>
                                    <option value="1">poor</option>
                                    <option value="2">fair</option>
                                    <option value="3">good</option>
                                    <option value="4">very good</option>
                                    <option value="5">excellent</option>
    
    
    
                                </select>
    
                                comment:    <input type="text"  value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
    
                                <button type="submit" >Submit Review</button>
                                </form>

                                ):(
                                    <Message>
                                        please <Link to="/login">Login</Link> to write review
                                    </Message>
                                )
                            
                            
                            } 
                            


                        
                    


                </div>

                
            )
        }
       
        </>
    )
}

export default ProductScreen;













// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createReview, fetchProductDetails } from "../redux/slices/productSlice";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Message from "../components/Message";
// import Loader from "../components/Loader";

// const ProductScreen = () => {
//   const [qty, setQty] = useState(1);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams(); // useParams hook instead of match.params

//   const productDetails = useSelector((state) => state.product.productDetails);
//   const { product, loading, error } = productDetails;

//   const userLogin = useSelector((state) => state.user);
//   const { userDetails } = userLogin;

//   const productReviewCreate = useSelector((state) => state.product.createReview);
//   const {
//     loading: loadingProductReview,
//     error: errorProductReview,
//     success: successProductReview,
//   } = productReviewCreate;

//   useEffect(() => {
//     if (successProductReview) {
//       setRating(0);
//       setComment("");
//     }
//     dispatch(fetchProductDetails(id));
//   }, [dispatch, id, successProductReview]);

//   const addToCartHandler = () => {
//     navigate(`/cart/${id}?qty=${qty}`);
//     // dispatch addToCart if implemented
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(createReview(id, { rating, comment }));
//   };

//   return (
//     <>
//       <Link to="/">Go back</Link>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <div>
//           <img src={product.image} alt={product.name} />
//           <h2>{product.name}</h2>
//           <h1>₹{product.price}</h1>
//           <p>Description: {product.description}</p>
//           <p>
//             {product.countInStock > 0 ? "In stock" : "Out of stock"}
//           </p>

//           {product.countInStock > 0 && (
//             <input
//               type="number"
//               value={qty}
//               min="1"
//               max={product.countInStock}
//               onChange={(e) => setQty(Number(e.target.value))}
//             />
//           )}

//           <button onClick={addToCartHandler}>Add to Cart</button>

//           <h2>Reviews</h2>
//           {product.reviews.length === 0 && <Message>No Reviews</Message>}

//           {product.reviews.map((review) => (
//             <div key={review._id}>
//               <strong>{review.name}</strong>
//               <div>Rating: {review.rating}</div>
//               <div>Date: {review.createdAt.substring(0, 10)}</div>
//               <div>{review.comment}</div>
//               <hr />
//             </div>
//           ))}

//           <h2>Write a Review</h2>

//           {loadingProductReview && <Loader />}
//           {successProductReview && <Message variant="success">Review Submitted</Message>}
//           {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

//           {userDetails ? (
//             <form onSubmit={submitHandler}>
//               <label>Rating</label>
//               <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//                 <option value="">Select...</option>
//                 <option value="1">Poor</option>
//                 <option value="2">Fair</option>
//                 <option value="3">Good</option>
//                 <option value="4">Very Good</option>
//                 <option value="5">Excellent</option>
//               </select>

//               <label>Comment</label>
//               <input
//                 type="text"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               />

//               <button type="submit">Submit</button>
//             </form>
//           ) : (
//             <Message>
//               Please <Link to="/login">Login</Link> to write a review
//             </Message>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductScreen;
