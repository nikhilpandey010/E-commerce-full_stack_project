
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// const Product=({product})=>{
//     return(
//         <>
//         <img src={product.image} alt="" />
//         <h1>{product.name}</h1>
//         <h1>Rating</h1>
//         {product.rating}

//         {/* <Rating  
//         value={product.rating}
//         color='#f&e824'
//         >

//         </Rating> */}
//         </>
//     )
// }



const Product = ({ product }) => {
  
  return (
    <>
    
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={product.image} /> 
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Rating: {product.rating} from {product.reviews.length} reviews
          Price: <h1>${product.price}</h1>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    
    </>
  );
};

export  default Product;