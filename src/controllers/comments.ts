import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import Comment from '../models/comment';

// Controller for liking a comment
export const likeComment = async (req: Request, res: Response) => {
  const commentId: string = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' });
    }
    comment.likes++;
    await comment.save();
    res.status(200).json({ message: 'Comment liked successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Controller for getting comments by post ID
export const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;
  try {
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Controller for adding a new comment to a post
export const addComment = async (req: Request, res: Response) => {
  const postId: string = req.params.postId;
  const { userId, text } = req.body;
  try {
    const comment = new Comment({
      text,
      postId
    });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
