import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  Container
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await dispatch(createUser(formData));
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        p: 2
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 480,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: 4
          }}
        >
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary',
              mb: 1
            }}
          >
            Create your account
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            Join us today
          </Typography>

          {error && <Message severity="error">{error}</Message>}
          {loading && <Loader />}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  variant="outlined"
                  value={formData.first_name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  variant="outlined"
                  value={formData.last_name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agree" color="primary" />}
                  label="I agree to the terms and conditions"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#4f46e5',
                '&:hover': {
                  backgroundColor: '#4338ca'
                }
              }}
            >
              Register
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Link 
                href="/login" 
                sx={{ 
                  color: '#4f46e5',
                  fontWeight: 'medium',
                  '&:hover': {
                    color: '#4338ca'
                  }
                }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default RegistrationForm;