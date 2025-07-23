



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopRatedProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Loader from './Loader';
import Message from './Message';
import Image1 from '../Media/Banner_images/image_1.jpg';
import Image2 from '../Media/Banner_images/image_2.jpg';
import Image3 from '../Media/Banner_images/image_3.jpg';



function ProductCarousel() {
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
  const { error, loading, products } = topRatedProducts;

  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
            <Carousel.Item >
              <Link to={'/'}>
                <img
                  src={Image1}
                />
                <Carousel.Caption className="carousel-caption">
                  <h5>{}</h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>

             <Carousel.Item >
              <Link to={'/'}>
                <img
                  src={Image2}
                />
                <Carousel.Caption className="carousel-caption">
                  <h5>{}</h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          
           <Carousel.Item >
              <Link to={'/'}>
                <img
                  src={Image3}
                />
                <Carousel.Caption className="carousel-caption">
                  <h5>{}</h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
        </Carousel>
      )}
    </>
  );
}

export default ProductCarousel;










