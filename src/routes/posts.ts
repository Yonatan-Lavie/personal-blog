import express from 'express';
import {
  getAllPosts,
  addLikeToPost,
  getCommentsForPost,
  addLikeToComment,
  updatePostWithComment,
  saveNewPost,
  getPostById,
} from '../controllers/posts';
import { isAuthenticatedMiddleware } from '../middlewares/is-authenticated-middleware';
import { isVerifiedUser } from '../middlewares/is-verified-user-middleware';

const router = express.Router();

// Middleware to ensure only authenticated and verified users can access the user profile page
// router.use(isAuthenticatedMiddleware, isVerifiedUser);

// GET /api/posts
router.get('/', getAllPosts);

// POST /api/posts/:postId/like
router.post('/:postId/like', isAuthenticatedMiddleware, isVerifiedUser, addLikeToPost);

// GET /api/posts/:postId/comments
router.get('/:postId/comments', isAuthenticatedMiddleware, isVerifiedUser, getCommentsForPost);

router.get('/:postId', getPostById);

// POST /api/comments/:commentId/like
router.post('/comments/:commentId/like', isAuthenticatedMiddleware, isVerifiedUser, addLikeToComment);

// POST /api/posts/:postId/comments
router.post('/:postId/comments', isAuthenticatedMiddleware, isVerifiedUser, updatePostWithComment);

// POST /api/posts
router.post('/', isAuthenticatedMiddleware, isVerifiedUser, saveNewPost);

export default router;
