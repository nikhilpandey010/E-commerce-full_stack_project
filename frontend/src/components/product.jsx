
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



// const Product = ({ product }) => {
//   console.log("Product component rendered with product:", product);
  
//   return (
//     <>
    
//     <Card style={{ width: '18rem' }}>
//     <Card.Img variant="top" src={product.image} /> 
//       <Card.Body>
//         <Card.Title>{product.name}</Card.Title>
//         <Card.Text>
//           Rating: {product.rating} from {product.reviews.length} reviews
//           Price: <h1>${product.price}</h1>
//         </Card.Text>
//         {/* <Button variant="primary">Go somewhere</Button> */}
//       </Card.Body>
//     </Card>
    
//     </>
//   );
// };

// export  default Product;

// src/components/product.js

import React from 'react';
// import Rating from './Rating'; // Assuming you have a Rating component

const Product = ({ product }) => {
  return (
    // The parent div with shadow and border is in HomeScreen.
    // This component just provides the content.
    <>
      {/* Product Image */}
      <div className="relative w-full aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>
          {product.name}
        </h3>

         {/* <div className="my-2">
          
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>  */}

        {/* Use a simple p or div tag for price, not a heading tag */}
        <p className="text-2xl font-bold text-gray-900">
          ${product.price}
        </p>
      </div>
    </>
  );
};

export default Product;



