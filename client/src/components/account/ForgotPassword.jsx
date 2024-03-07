import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { forgotPassword } from '../../service/forgotPasswordApi'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    console.log(email);
    try {
      const response = await forgotPassword(email); 
      if (response.status === 200) {
        setMessage(response.data.message);
        console.log("hello from 200");
      } else {
        setMessage('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error('Forgot password request error:', error);
      setMessage('Something went wrong! Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Forgot Password</Typography>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button variant="contained" onClick={handleForgotPassword}>Submit</Button>
      <Typography>{message}</Typography>
    </Box>
  );
};

export default ForgotPassword;
