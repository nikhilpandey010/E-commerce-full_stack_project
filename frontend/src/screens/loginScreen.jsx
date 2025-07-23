// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// const LoginScreen=({location,history})=>{
//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("");

//     const dispatch= useDispatch();
//     const redirect = location.search ? location.search.split("")[1] : "/";

//     const userLogin = useSelector((state) => state.user);
//     const {userDetails , loading , error} = userLogin;
    
//     useEffect(()=>{
//         if(userDetails)
//         {
//             history.replaceState(redirect);
//         }
       
//     },[history,userDetails,redirect]);

//     const submitHandler =(e) =>{
//         e.preventDefault();
//         console.log(email, password);
//         dispatch(login(email,password));
//     };
    
//     return(
//         <>
//     <Form>
       
//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Email</Form.Label>
//         <Form.Control type="email" onChange={(e)=>{setEmail(e.target.value)}} />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
//       </Form.Group>

//        <Button variant="primary" type="submit" onSubmit={submitHandler}>
//         Submit
//       </Button>
//     </Form>

//     <p>Already have an account ? <a href={Navigate("/register")}>sign in</a></p>
    
        
//         </>
//     )
    
// }

// export default LoginScreen;


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../redux/slices/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect') || '/';

  const userLogin = useSelector((state) => state.user);
  const { userDetails, loading, error } = userLogin;

  // useEffect(() => {
  //   if (userDetails) {
  //     // navigate(redirect);
  //   }
 // }, [navigate, userDetails, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password ));

    navigate("/home");
  };

  return (
    < >
      <h2 style={{textAlign:"center",marginTop:"50px"}} >Sign In</h2>
      {error && <Message  variant="danger"/>}
      {loading && <Loader/>}
      <center>
        <Form onSubmit={submitHandler} style={{ width: '300px' ,marginTop:"30px",border:"1px solid black", padding:"20px", borderRadius:"10px"}}> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>
        Don't have an account?{' '}
        <Link to="/register">Sign up</Link>
      </p>
      </Form>
      </center>

      
    </>
  );
};

export default LoginScreen;


