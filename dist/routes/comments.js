"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_1 = require("../controllers/comments");
const commentsRouter = express_1.default.Router();
// Endpoint: POST /api/comments/:commentId/like
commentsRouter.post('/:commentId/like', comments_1.likeComment);
// Endpoint: GET /api/posts/:postId/comments
commentsRouter.get('/:postId/comments', comments_1.getCommentsByPostId);
// Endpoint: POST /api/posts/:postId/comments
commentsRouter.post('/:postId/comments', comments_1.addComment);
exports.default = commentsRouter;
