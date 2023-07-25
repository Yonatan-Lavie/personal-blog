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
exports.saveNewPost = exports.updatePostWithComment = exports.addLikeToComment = exports.getCommentsForPost = exports.addLikeToPost = exports.getAllPosts = void 0;
const post_1 = __importDefault(require("../models/post"));
const comment_1 = __importDefault(require("../models/comment"));
// Controller for getting all posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const postsPerPage = 10; // Number of posts per page
        const pageNumber = page ? parseInt(page) : 1;
        const skipCount = (pageNumber - 1) * postsPerPage;
        const posts = yield post_1.default.find()
            .sort({ createdAt: -1 })
            .skip(skipCount)
            .limit(postsPerPage)
            .populate('comments', 'text likes')
            .select('-updatedAt')
            .exec();
        res.status(200).json({ posts });
    }
    catch (error) {
        console.error('Error while fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllPosts = getAllPosts;
// Controller for adding a like to a post
const addLikeToPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes += 1;
        yield post.save();
        res.status(200).json({ message: 'Post liked successfully' });
    }
    catch (error) {
        console.error('Error while adding like to post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addLikeToPost = addLikeToPost;
// Controller for getting comments for a post
const getCommentsForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = yield comment_1.default.find({ postId }).select('-updatedAt').exec();
        res.status(200).json({ comments });
    }
    catch (error) {
        console.error('Error while fetching comments for post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getCommentsForPost = getCommentsForPost;
// Controller for adding a like to a comment
const addLikeToComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentId } = req.params;
        const comment = yield comment_1.default.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        comment.likes += 1;
        yield comment.save();
        res.status(200).json({ message: 'Comment liked successfully' });
    }
    catch (error) {
        console.error('Error while adding like to comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addLikeToComment = addLikeToComment;
// Controller for updating a post with a new comment
const updatePostWithComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const post = yield post_1.default.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newComment = new comment_1.default({ text, postId });
        yield newComment.save();
        post.comments.push(newComment._id);
        yield post.save();
        res.status(201).json({ message: 'Comment added successfully' });
    }
    catch (error) {
        console.error('Error while updating post with comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updatePostWithComment = updatePostWithComment;
// Controller for saving a new post
const saveNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, photo } = req.body;
        const newPost = new post_1.default({ text, photo });
        yield newPost.save();
        res.status(201).json({ message: 'Post created successfully' });
    }
    catch (error) {
        console.error('Error while saving new post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.saveNewPost = saveNewPost;
