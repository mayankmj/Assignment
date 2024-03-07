   
   
// import { request, response } from 'express';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Token from '../model/token.js';

// nodemailer
import transporter from '../utils/transporter.js'; 
dotenv.config();


export const forgotPassword = async (request, response) => {
  const userid  = request.body.email;
    console.log(userid);
    try {
      const user = await User.findOne({ username:userid});
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      await sendmail(userid);

      return response.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const sendmail= async (request, response) => {
    try {
      // Construct password reset link with token
      const email = request;
      console.log(request);
      const token = generatePasswordResetToken(email);
      const resetLink = `http://localhost:3000/reset-password/${token}`;
    
      // Compose email message
      const mailOptions = {
        from: 'mayankjohari877@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink}`,
      };
    
      // Send email
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  const generatePasswordResetToken = (email) => {

    const payload = {
      email: email,
    };
    const token = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });
  
    return token;
  };

  export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(newPassword)
    try {
     
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

      const userEmail = decoded.email;
      console.log(userEmail);
      const user = await User.findOne({ username: userEmail });
  
      // If user not found or token is invalid
      if (!user) {
        return res.status(404).json({ message: 'User not found or invalid token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      // Respond with success message
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  };
  
export const signupUser = async (request , response ) =>{ // resquest comes from frontend like api url api body api header
    // console.log(request.body);
                try {
                      const hashedPassword = await bcrypt.hash(request.body.password, 10);

                   const user = { username: request.body.username, name: request.body.name, password: hashedPassword, role:request.body.role}

                 const newUser = new User(user);
                         await newUser.save();

                         return response.status(200).json({ msg: 'Signup successfull' });
                } catch (error) {
                    console.log(error);
                    return response.status(500).json({msg : '1error'});
                }                                     // response goes from backend to frontend according to the request
                                                     
} ;


export const loginUser = async (request, response) => {
  try {
      const user = await User.findOne({ username: request.body.username });

      if (!user) {
          return response.status(400).json({ msg: 'Username does not exist! Please Login' });
      }

      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
          const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
          const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

          const newToken = new Token({ token: refreshToken });
          await newToken.save();

          // Check if user role is "admin"
          if (user.role === 'admin') {
              return response.status(200).json({
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  name: user.name,
                  username: user.username,
                  role: user.role, 
                  isAdmin: true 
              });
          }

          return response.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              name: user.name,
              username: user.username,
              role: user.role 
          });
      } else {
          return response.status(400).json({ msg: 'Wrong Password' });
      }
  } catch (error) {
      console.error('Error while login:', error);
      return response.status(500).json({ msg: 'Error while login' });
  }
};
