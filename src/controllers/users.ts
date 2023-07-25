// userProfileController.ts
import { Request, Response } from 'express';
import UserModel from '../models/user';

// Controller function to get the user profile
export const getUserProfile = async (req: Request, res: Response) => {
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

    // Exclude sensitive fields like password from the response
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      photo: user.photo,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    };

    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to save the user's profile photo
export const saveUserProfilePhoto = async (req: Request, res: Response) => {
  try {
    // Retrieve the user ID from the authenticated user
    const {userId} = req;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }

    // Retrieve the profile photo from the request body
    const { photo } = req.body;

    // Save the profile photo to the user document in the database
    await UserModel.findByIdAndUpdate(userId, { photo });

    return res.status(200).json({ message: 'Profile photo saved successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};
