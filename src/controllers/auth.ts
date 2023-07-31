import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

import User from '../models/user'; // Replace 'User' with your user model.
import EmailVerification from '../models/email-verification'; // Replace 'EmailVerification' with your email verification model.

// Secret key for JWT (you should use a secure random key in production)
const JWT_SECRET_KEY = 'your-secret-key';

// Helper function to generate a JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

const sendVerificationEmail = async (email: string, verificationId: string, userId: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yonatan.lavie89@gmail.com',
      pass: 'xmcjnxfeciscduso',
    },
  });

  const mailOptions = {
    from: 'your-email@example.com', // Sender email address.
    to: email, // Recipient email address.
    subject: 'Email Verification',
    text: `Thank you for registering! Please click the following link to verify your email: 
      ${process.env.PUBLIC_DOMAIN_NAME}/api/auth/verify/${verificationId}/${userId}`,
    // You can use HTML format if needed.
  };

  await transporter.sendMail(mailOptions);
};

// Controller for handling user signup
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, username, photo } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      username,
      photo,
      status: 'unverified',
      role: 'user',
    });

    // Save the user to the database
    await newUser.save();

    // Generate a verificationId and save it to the email verification collection
    const verificationId = jwt.sign({ userId: newUser._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    const emailVerification = new EmailVerification({
      userId: newUser._id,
      verificationId,
    });
    await emailVerification.save();

    // Send an email with the verification link
    await sendVerificationEmail(email, verificationId, newUser._id);

    res.status(201).json({ message: 'User signed up successfully. Check your email for verification.' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for handling email verification
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { uniqueIdentifier } = req.params;

    // Verify the uniqueIdentifier
    const decoded = jwt.verify(uniqueIdentifier, JWT_SECRET_KEY) as { userId: string };
    const userId = decoded.userId;

    // Update the user status to 'verified'
    await User.findByIdAndUpdate(userId, { status: 'verified' });

    // Delete the email verification record
    await EmailVerification.findOneAndDelete({ userId });

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during email verification:', error);
    res.status(400).json({ message: 'Invalid verification link' });
  }
};

// Controller for handling user signin
export const signinUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate and send a JWT token in cookies
    const token = generateToken(user._id);
    console.log(token);
    
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Token valid for 1 hour
    console.log(res.cookie);
    
    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error during user signin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for handling user signout
export const signoutUser = (req: Request, res: Response) => {
  // Clear the JWT token from cookies
  res.clearCookie('token');
  res.status(200).json({ message: 'User signed out successfully' });
};

// Controller for handling password reset
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;

    // Find the user by id
    const user = await User.findById({ _id:userId });

    // If the user is not found, return an error to avoid revealing user existence
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset password link and send it in an email (you should implement this part)

    res.status(200).json({ userRole: user.role });
  } catch (error) {
    console.error('Error during verifing User:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return an error to avoid revealing user existence
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate a reset password link and send it in an email (you should implement this part)

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

