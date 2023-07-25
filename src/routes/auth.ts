import express from 'express';
import { signupUser, verifyEmail, signinUser, signoutUser, resetPassword } from '../controllers/auth';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware';
import { isVerifiedUser } from '../middlewares/is-verified-user-middleware';

const router = express.Router();

// POST /api/signup
router.post('/signup', signupUser);

// GET /api/verify/:uniqueIdentifier
router.get('/verify/:uniqueIdentifier', verifyEmail);

// POST /api/signin
router.post('/signin', signinUser);

// GET /api/signout
router.get('/signout',isAuthenticatedMiddleware, isVerifiedUser, signoutUser);

// POST /api/reset-password
router.post('/reset-password',isAuthenticatedMiddleware, isVerifiedUser,  resetPassword);

export default router;
