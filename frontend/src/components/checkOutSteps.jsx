
import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

const steps = ['Sign In', 'Shipping', 'Order Summary', 'Payment'];

export default function CheckOutSteps({ activeStep }) {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}