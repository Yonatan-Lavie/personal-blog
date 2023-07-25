"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const router = express_1.default.Router();
// GET /api/posts
router.get('/', posts_1.getAllPosts);
// POST /api/posts/:postId/like
router.post('/:postId/like', posts_1.addLikeToPost);
// GET /api/posts/:postId/comments
router.get('/:postId/comments', posts_1.getCommentsForPost);
// POST /api/comments/:commentId/like
router.post('/comments/:commentId/like', posts_1.addLikeToComment);
// POST /api/posts/:postId/comments
router.post('/:postId/comments', posts_1.updatePostWithComment);
// POST /api/posts
router.post('/', posts_1.saveNewPost);
exports.default = router;
