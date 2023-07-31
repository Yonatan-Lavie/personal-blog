import { Request, Response } from 'express';
import Post from '../models/post';
import Comment from '../models/comment';

// Controller for getting all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const postsPerPage = 10; // Number of posts per page
    console.log(page);
    
    const pageNumber = page ? parseInt(page as string) : 1;
    const skipCount = (pageNumber - 1) * postsPerPage;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(postsPerPage)
      .populate('comments', 'text likes')
      .select('-updatedAt')
      .exec();

    res.status(200).json({ posts });
  } catch (error) {
    console.error('Error while fetching posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for adding a like to a post
export const addLikeToPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error while adding like to post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for getting comments for a post
export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).select('-updatedAt').exec();

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error while fetching comments for post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for getting comments for a post
export const getPostById = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const { postId } = req.params;
    const post = await Post.findById(postId);

    res.status(200).json({ post });
  } catch (error) {
    console.error('Error while fetching comments for post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for adding a like to a comment
export const addLikeToComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.likes += 1;
    await comment.save();

    res.status(200).json({ message: 'Comment liked successfully' });
  } catch (error) {
    console.error('Error while adding like to comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating a post with a new comment
export const updatePostWithComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const { userId } = req

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({ text, postId, userId});
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error while updating post with comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const saveNewPost = async (req: Request, res: Response) => {
  try {
    const { text, photo } = req.body;
    const { userId } = req

    // Create a new post associated with the user (userId is set by the middleware)
    const newPost = new Post({ text, photo, userId: userId });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error while saving new post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};