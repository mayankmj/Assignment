// forgotPasswordApi.js
import axios from 'axios';

const API_URL = 'https://assignment-u81b.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
    }
});

const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const resetPassword = async (token, password) => {
    console.log(token)
    console.log(password);
    console.log("hello from reset password")
    try {
        const response = await axiosInstance.post(`/reset-password/${token}`, { token, newPassword: password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { forgotPassword, resetPassword };
