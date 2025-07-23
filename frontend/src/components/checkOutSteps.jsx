
// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import { Link } from 'react-router-dom';

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

// export default function CheckOutSteps({step1,step2,step3}) {
//   return (
//     <div role="presentation" onClick={handleClick}>
//       <Breadcrumbs aria-label="breadcrumb">
    

//     <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
//       MUI
//     </Link>

//         <Link
//           to="/login"
//           underline="hover"
//           color="inherit"
//           href="/material-ui/getting-started/installation/"
//         >
//           Core
//         </Link>
//         <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
//       </Breadcrumbs>
//     </div>
//   );
// }



import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';  // for navigation

export default function CheckOutSteps({ step1, step2, step3, step4 }) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">

        {step1 ? (
          <Link component={RouterLink} to="/login" underline="hover" color="inherit">
            Sign In
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


