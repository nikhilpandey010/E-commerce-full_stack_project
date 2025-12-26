
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Search from './searchBox';

function Header() {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.user);

  return (
    <Navbar
      expand="lg"
      className="bg-white border-b border-gray-100 sticky-top p-0 shadow-sm"
    >
      <Container fluid className="max-w-7xl mx-auto px-4 h-20">

        {/* ================= BRAND LOGO ================= */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="flex items-center gap-2 m-0 p-0 transition-transform active:scale-95"
        >
          <div className="bg-red-600 h-10 w-10 rounded-xl flex items-center justify-center shadow-lg shadow-red-200">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 hidden sm:block">
            Shop<span className="text-red-600">Easy</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0" />

        <Navbar.Collapse id="navbarScroll">

          {/* ================= LEFT NAV ================= */}
          <Nav className="ms-lg-8 flex items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="text-[13px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-600 px-4 py-7"
            >
              Home
            </Nav.Link>
          </Nav>

          {/* ================= SEARCH ================= */}
          <div className="flex-grow flex justify-center px-8 my-4 lg:my-0">
            <div className="w-full max-w-lg">
              <Search />
            </div>
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-6 lg:gap-8 pb-4 lg:pb-0">

            {userDetails ? (
              <div className="flex items-center gap-6">

                <button
                  onClick={() => navigate('/cart')}
                  className="relative bg-transparent border-0 transition-transform active:scale-90"
                >
                  <FaShoppingCart
                    size={22}
                    className="text-slate-700 hover:text-red-600"
                  />
                 
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  className="bg-transparent border-0 transition-transform active:scale-90"
                >
                  <FaUser
                    size={20}
                    className="text-slate-700 hover:text-red-600"
                  />
                </button>

              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/register')}
                  className="text-[12px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 bg-transparent border-0"
                >
                  Join
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-slate-900 hover:bg-red-600 text-white px-8 py-2.5 rounded-full text-[12px] font-black tracking-widest uppercase transition-all shadow-md"
                >
                  Login
                </button>
              </div>
            )}

          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
