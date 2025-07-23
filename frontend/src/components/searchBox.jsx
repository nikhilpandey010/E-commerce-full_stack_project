import { useState } from "react"
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Search=()=>{
    const [keyword,setKeyword]= useState("");
    const navigate= useNavigate();

const submitHandler=(e)=>{
    e.preventDefault();
    console.log(keyword);

    navigate(`/?keyword=${keyword}&page=1`);
}

    return(
        <>
         <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{setKeyword(e.target.value)}}
              
            />
            <Button variant="outline-success" type="submit" onClick={submitHandler}>Search</Button>
          </Form>
        
        {/* <input type="text" onChange={(e)=>{setKeyword(e.target.value)}} /> */}
        {/* <button type="submit" onSubmit={submitHandler}>Search</button>  */}
        </>
    )
}

export default Search;