import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  text: string;
  photo?: string;
  likes: number;
  userId: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  text: { type: String, required: true },
  photo: { type: String },
  likes: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>('Post', PostSchema);