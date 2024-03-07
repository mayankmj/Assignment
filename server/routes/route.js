import express from 'express';
import { signupUser, loginUser, forgotPassword, resetPassword } from '../controller/user-controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); 
router.post('/reset-password/:token', resetPassword);   
export default router;
