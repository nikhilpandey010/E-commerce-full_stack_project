// import { useState } from "react"
// import { useNavigate } from "react-router-dom";

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// const Search=()=>{
//     const [keyword,setKeyword]= useState("");
//     const navigate= useNavigate();

// const submitHandler=(e)=>{
//     e.preventDefault();
//     console.log(keyword);

//     navigate(`/?keyword=${keyword}&page=1`);
// }

//     return(
//         <>
//          <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//               onChange={(e)=>{setKeyword(e.target.value)}}
              
//             />
//             <Button variant="outline-success" type="submit" onClick={submitHandler}>Search</Button>
//           </Form>
        
 
//         </>
//     )
// }

// export default Search;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(keyword);
        navigate(`/?keyword=${keyword}&page=1`);
    }

    return (
        <div className="position-relative" style={{ width: '700px' }}>
            <Form className="d-flex" onSubmit={submitHandler}>
                <div className="position-relative flex-grow-1">
                    <FiSearch className="position-absolute top-50 start-3 translate-middle-y text-gray-400" />
                    <Form.Control
                        type="search"
                        placeholder="Search products, brands, categories..."
                        className="ps-5 py-2 border-end-0"
                        aria-label="Search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            borderRadius: '24px 0 0 24px',
                            fontSize: '1rem',
                            height: '44px'
                        }}
                    />
                </div>
                <Button 
                    variant="primary" 
                    type="submit"
                    className="px-4"
                    style={{
                        borderRadius: '0 24px 24px 0',
                        height: '44px'
                    }}
                >
                    Search
                </Button>
            </Form>
        </div>
    )
}

export default Search;

