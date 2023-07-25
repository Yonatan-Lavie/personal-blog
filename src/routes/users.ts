import express from 'express';
import { getUserProfile, saveUserProfilePhoto } from '../controllers/users';
import { isVerifiedUser } from '../middlewares/is-verified-user-middleware';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware';


const router = express.Router();

// Middleware to ensure only authenticated and verified users can access the user profile page
router.use(isAuthenticatedMiddleware, isVerifiedUser);

// Route to get the user profile
router.get('/profile', getUserProfile);

// Route to save the user's profile photo
router.post('/update/profile-photo', saveUserProfilePhoto);



export default router;
