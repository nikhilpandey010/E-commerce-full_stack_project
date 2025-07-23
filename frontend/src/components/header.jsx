


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from './searchBox';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const navigate = useNavigate();
  const userlogin = useSelector(state=>state.user);
  const {userDetails} = userlogin;
  console.log(userDetails);
  const [choice, setChoice] = useState('');

  const userLogin=()=>{
    navigate('/login')
  }
  const userRegister=()=>{
    navigate('/register')
  }

  
  const handleSelect = (eventKey) => {
    if (eventKey === 'profile') navigate('/profile');
    else if (eventKey === 'order') navigate('/orderDetails');
  };
  return (
  
  <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Category" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              category
            </Nav.Link>
          </Nav>

          <Search />

          {userDetails ? (
            <Nav onSelect={handleSelect}>
              <NavDropdown title="Profile" id="user-nav-dropdown">
                <NavDropdown.Item eventKey="profile">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="order">
                  My Orders
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <>
              <button
                style={{
                  backgroundColor: 'red',
                  border: '2px solid white',
                  color: 'white',
                  height: '43px',
                  width: '90px',
                  borderRadius: '10px',
                  marginRight: '0.5rem'
                }}
                onClick={userRegister}
              >
                Sign Up
              </button>
              <button
                style={{
                  backgroundColor: 'red',
                  border: '2px solid white',
                  color: 'white',
                  height: '43px',
                  width: '90px',
                  borderRadius: '10px'
                }}
                onClick={userLogin}
              >
                Login
              </button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header ;








