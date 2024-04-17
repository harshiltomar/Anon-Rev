import mongoose, { Schema, Document } from "mongoose";

export interface MessageSchemaProps extends Document {
  content: string;
  createdAt: Date;
}

export interface UserSchemaProps extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: MessageSchemaProps[];
}

const MessageSchema: Schema<MessageSchemaProps> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const UserSchema: Schema<UserSchemaProps> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.\..+/, "Please use a Valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify Code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

// If pre-running and model exists in DB, then the First One will be called as a model of type UserSchemaProps. And if running from scratch, then create a New DB of user as he second Arguement
// From scratch me, a new mongoose model is created with UserSchemaProps type name User and Schema being UserSchema
const UserModel =
  (mongoose.models.User as mongoose.Model<UserSchemaProps>) ||
  mongoose.model<UserSchemaProps>("User", UserSchema);

export default UserModel;
