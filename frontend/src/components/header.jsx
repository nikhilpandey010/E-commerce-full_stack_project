
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Search from './searchBox';
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { addTocart } from '../redux/slices/cartSlice';
// import { FaShoppingCart } from 'react-icons/fa';

// function Header() {
//   const navigate = useNavigate();
//   const userlogin = useSelector(state=>state.user);
//   const {userDetails} = userlogin;
//   console.log(userDetails);
//   const [choice, setChoice] = useState('');

//   const userLogin=()=>{
//     navigate('/login')
//   }
//   const userRegister=()=>{
//     navigate('/register')
//   }

//   const handelCart=()=>{
//     navigate('/cart')
//   }

  
//   const handleSelect = (eventKey) => {
//     if (eventKey === 'profile') navigate('/profile');
//     else if (eventKey === 'order') navigate('/orderDetails');
//   };
//   return (
  
//   <Navbar expand="lg" className="bg-body-tertiary">
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link href="#action2">Link</Nav.Link>
//             <NavDropdown title="Category" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               category
//             </Nav.Link>
//           </Nav>

//           <Search />

//           {userDetails ? (
//             <div>
//               <Nav onSelect={handleSelect}>
//               <NavDropdown title="Profile" id="user-nav-dropdown">
//                 <NavDropdown.Item eventKey="profile">
//                   My Profile
//                 </NavDropdown.Item>
//                 <NavDropdown.Item eventKey="order">
//                   My Orders
//                 </NavDropdown.Item>
//               </NavDropdown>
//             </Nav>
//            <button
//             onClick={handelCart}
//             className="
//               bg-red-500 hover:bg-red-700
//               text-white font-bold
//               py-2 px-4
//               rounded-lg
//               transition-colors duration-200
//             "
//           >
//             Cart
//           </button>
//             </div>
            

            
//           ) : (
//             <>
//               <button
//                 style={{
//                   backgroundColor: 'red',
//                   border: '2px solid white',
//                   color: 'white',
//                   height: '43px',
//                   width: '90px',
//                   borderRadius: '10px',
//                   marginRight: '0.5rem'
//                 }}
//                 onClick={userRegister}
//               >
//                 Sign Up
//               </button>
//               <button
//                 style={{
//                   backgroundColor: 'red',
//                   border: '2px solid white',
//                   color: 'white',
//                   height: '43px',
//                   width: '90px',
//                   borderRadius: '10px'
//                 }}
//                 onClick={userLogin}
//               >
//                 Login
//               </button>
//             </>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>

  

//   );
// }

// export default Header ;

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Search from './searchBox';

function Header() {
  const navigate = useNavigate();
  const { userDetails } = useSelector(state => state.user);

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3 sticky-top">
      <Container fluid className="px-4">
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="me-8 text-xl font-bold text-gray-800">
          ShopEasy
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          {/* Navigation Links */}
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to="/" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="px-3 py-2 text-gray-600 hover:text-gray-900">
              Products
            </Nav.Link>
            <NavDropdown 
              title="Categories" 
              id="navbarDropdown"
              className="px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              <NavDropdown.Item>Electronics</NavDropdown.Item>
              <NavDropdown.Item>Clothing</NavDropdown.Item>
              <NavDropdown.Item>Home & Garden</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-aligned elements */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            {/* Search Box */}
            {/* <div className="position-relative" style={{ width: '250px' }}>
              <FiSearch className="position-absolute top-50 start-3 translate-middle-y text-gray-400" />
              <Search />
            </div> */}

              
            <Search />

            {/* Conditional rendering based on auth */}
            {userDetails ? (
              <>
                {/* Cart Button */}
                <button 
                  onClick={() => navigate('/cart')}
                  className="d-flex align-items-center gap-2 bg-transparent border-0 text-gray-700 hover:text-red-500 transition-colors"
                >
                  <FaShoppingCart className="fs-5" />
                  <span className="d-none d-lg-inline">Cart</span>
                </button>

                {/* Profile Dropdown */}
                <button 
                  onClick={() => navigate('/profile')}
                  className="d-flex align-items-center gap-2 bg-transparent border-0 text-gray-700 hover:text-red-500 transition-colors"
                >
                   <FaUser className="fs-5" />
                  <span className="d-none d-lg-inline">Profile</span>
                </button>
                
              </>
            ) : (
              <>
                {/* Login/Signup Buttons */}
                <button
                  onClick={() => navigate('/register')}
                  className="btn btn-outline-danger rounded-pill px-3 py-1"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-danger rounded-pill px-3 py-1"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;





