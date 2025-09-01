



import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';  // for navigation
import { useSelector } from 'react-redux';



export default function CheckOutSteps({ step1, step2, step3 ,step4}) {
const userLogin = useSelector((state) => state.user);
const { userDetails } = userLogin;
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">

        {step1  ? (
          <Link component={RouterLink} to="/login" underline="hover" color="inherit">
            Shipping
          </Link>
        ) : (
          <Typography color="text.disabled">Sign In</Typography>
        )}

        {step2 ? (
          <Link component={RouterLink} to="/shipping" underline="hover" color="inherit">
            Shipping
          </Link>
        ) : (
          <Typography color="text.disabled">Shipping</Typography>
        )}

        {step3 ? (
          <Link component={RouterLink} to="/placeorder" underline="hover" color="inherit">
            Place Order
          </Link>
        ) : (
          <Typography color="text.disabled">Place Order</Typography>
        )}

        {step4 ? (
          <Link component={RouterLink} to="/payment" underline="hover" color="inherit">
            Payment
          </Link>
        ) : (
          <Typography color="text.disabled">Payment</Typography>
        )}

      </Breadcrumbs>
    </div>
  );
}

