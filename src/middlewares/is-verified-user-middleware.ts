import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

export const isVerifiedUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Retrieve the user ID from the authenticated user
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    // Fetch the user from the database
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is verified
    if (user.status !== 'verified') {
      return res.status(403).json({ error: 'User email not verified' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};