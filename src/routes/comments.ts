import express, { Router } from 'express';
import { likeComment, getCommentsByPostId, addComment } from '../controllers/comments';
import { isVerifiedUser } from '../middlewares/is-verified-user-middleware';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware';

const router: Router = express.Router();

// Middleware to ensure only authenticated and verified users can access the user profile page
router.use(isAuthenticatedMiddleware, isVerifiedUser);

// Endpoint: POST /api/comments/:commentId/like
router.post('/:commentId/like', likeComment);

// Endpoint: GET /api/posts/:postId/comments
router.get('/:postId/comments', getCommentsByPostId);

// Endpoint: POST /api/posts/:postId/comments
router.post('/:postId/comments', addComment);

export default router;
