"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.getCommentsByPostId = exports.likeComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
// Controller for liking a comment
const likeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    try {
        const comment = yield comment_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }
        comment.likes++;
        yield comment.save();
        res.status(200).json({ message: 'Comment liked successfully.' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.likeComment = likeComment;
// Controller for getting comments by post ID
const getCommentsByPostId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    try {
        const comments = yield comment_1.default.find({ postId });
        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.getCommentsByPostId = getCommentsByPostId;
// Controller for adding a new comment to a post
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const { userId, text } = req.body;
    try {
        const comment = new comment_1.default({
            text,
            postId
        });
        yield comment.save();
        res.status(201).json({ message: 'Comment added successfully.' });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});
exports.addComment = addComment;
