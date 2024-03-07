import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 25, 
    secure: false,
    auth: {
      user: '104cb69291d358', 
      pass: '9c19b70c65515a', 
    },
});

export default transporter;
