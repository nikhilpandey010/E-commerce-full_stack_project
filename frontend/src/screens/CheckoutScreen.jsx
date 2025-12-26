import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CheckOutSteps from '../components/checkOutSteps'
import ShippingScreen from './shippingScreen'
import OrderSummary from '../components/OrderSummary'; 
import PaymentScreen from './paymentScreen';
import LoginScreen from './loginScreen';

const CheckoutScreen = () => {
  const [activeStep, setActiveStep] = useState(1); 
  const cart = useSelector((state) => state.cart);
  const {product} = useSelector((state) => state.product.buyNowProduct);
  const user = useSelector((state) => state.user);
  const { userDetails, loading, error } = user;
  console.log("CheckoutScreen buyNowProduct:", product);

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      <CheckOutSteps activeStep={activeStep} />

      <div className="mt-8">

        { activeStep ===1 && (
            <>
            {! userDetails ?(
                <LoginScreen onNext={nextStep}/>
              ) :
              (
                nextStep()
              )
            }
            </>
            
            
          )
        }
        {activeStep === 2 && (
          <ShippingScreen onNext={nextStep}  />
        )}

        {activeStep === 3 && (
            <>
            {product && product._id ? (
            <OrderSummary 
            cart={{ cartItems: [{ ...product, qty: 1 }] }}
            onNext={nextStep} 
            onBack={prevStep} 
          />
            ) : (       
          <OrderSummary 
            cart={cart} 
            onNext={nextStep} 
            onBack={prevStep} 
          />
            )
            }
            </>
        )}

        {activeStep === 4 && (
          <>
            {product && product._id ? (
            <PaymentScreen
            cart={{ cartItems: [{ ...product, qty: 1 }] }}
            
            onBack={prevStep} 
          />
            ) : (       
          <PaymentScreen 
            cart={cart} 
            onBack={prevStep} 
          />
            )
            }
            </>
          
        )}
      </div>
    </div>
  );
};

export default CheckoutScreen;


