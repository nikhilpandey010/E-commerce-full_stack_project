
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log('Form data:', formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    dispatch(createUser(formData));
    console.log('Form submitted:', formData);
    navigate("/login")
  };

  return (
    <>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}/>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="first_name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="last_name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          {/* </<pad><pad><pad><pad><pad><pad><pad><pad> */}

          </Grid>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
    </>
  )
};


export default RegistrationForm;