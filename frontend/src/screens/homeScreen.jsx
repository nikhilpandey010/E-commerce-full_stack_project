// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";
// import { fetchProductList } from "../redux/slices/productSlice";
// import ProductCarousel from "../components/productCarousel";
// import Loader from "../components/loader";
// import Message from "../components/message";
// import Product from "../components/product";





// const HomeScreen=()=>{
    
//     const location= useLocation();
//     const dispatch = useDispatch();
//     const productList  = useSelector((state)=> state.product.productList);
//     const topRatedProducts = useSelector((state) => state.product.topRatedProducts);

//     const {products , loading, error , page , pages} = productList;
//     const {pageNumber} = useParams()

//     console.log(pageNumber)

//     // const { products:topProducts , loading:topLoading , error:topError } = topRatedProducts;
//     console.log(productList)

//     let keyword = location.search ;

//     useEffect(()=>{
//         dispatch(fetchProductList(keyword,pageNumber));
//     },[dispatch,keyword,pageNumber])

    
    
//     return(
//         <>
//         { !keyword && (
//             <ProductCarousel/>
//         )

//         }

//         <h1>hello friends</h1>

//         {
//             loading ? (
//                 <Loader/>
//             ) : error ? (
//                 <Message varient="danger">{error}</Message>
//             ): (
               
//             <div>
//                   {Array.isArray(products) && products.map((product) => (
//                   <Product key={product.id} product={product}/>
//                 ))}

//             </div>
//             )}

            
        
    

        
//         </>
//     )
    
// }

// export default HomeScreen;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchProductList } from "../redux/slices/productSlice";
import ProductCarousel from "../components/productCarousel";

import Product from "../components/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/paginate";

const HomeScreen = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList) || {};

  console.log(productList);
  const { products, loading, error , page, pages } = productList;
  console.log(products);

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword") || '' ;

  const pageNumber = searchParams.get("page") || "1";


  console.log(keyword,"99999");

  useEffect(() => {
    dispatch(fetchProductList(keyword, pageNumber));
  },[dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}

      <h1>Latest Products</h1>

      {loading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {Array.isArray(products) &&
            products.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
               <Product  product={product} />
              </Link>
             
              
            ))}
        </div>
      )}

      <Paginate page={page} pages={pages} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
