// models/comment.ts
import mongoose, { Document, Types, Schema } from 'mongoose';



interface Comment extends Document {
  text: string;
  likes: number;
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<Comment>({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model<Comment>('Comment', commentSchema);

export default Comment;
