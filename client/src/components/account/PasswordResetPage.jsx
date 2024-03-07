// ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { resetPassword } from '../../service/forgotPasswordApi';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async () => {
        console.log(token);
        try {
            const response = await resetPassword(token, password);
            setMessage(response.message);
        } catch (error) {
            setMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <Box>
            <Typography variant="h4">Reset Password</Typography>
            <TextField
                type="password"
                label="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
            <Typography>{message}</Typography>
        </Box>
    );
};

export default ResetPasswordPage;
