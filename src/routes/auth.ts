import express from 'express';
import { signupUser, verifyEmail, signinUser, signoutUser, resetPassword, verifyUser } from '../controllers/auth';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware';
import { isVerifiedUser } from '../middlewares/is-verified-user-middleware';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signupUser);

// GET /api/auth/verify/:uniqueIdentifier
router.get('/verify/:uniqueIdentifier', verifyEmail);

// GET /api/auth/verify
router.get('/verify',isAuthenticatedMiddleware, isVerifiedUser, verifyUser);

// POST /api/auth/signin
router.post('/signin', signinUser);

// GET /api/auth/signout
router.get('/signout',isAuthenticatedMiddleware, isVerifiedUser, signoutUser);

// POST /api/auth/reset-password
router.post('/reset-password',isAuthenticatedMiddleware, isVerifiedUser,  resetPassword);

export default router;
