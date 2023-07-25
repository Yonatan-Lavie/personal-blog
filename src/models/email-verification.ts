import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailVerification extends Document {
  userId: mongoose.Types.ObjectId;
  verificationId: string;
}

const emailVerificationSchema: Schema<IEmailVerification> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    verificationId: { type: String, required: true },
  },
  { timestamps: true }
);

const EmailVerification = mongoose.model<IEmailVerification>('EmailVerification', emailVerificationSchema);

export default EmailVerification;
