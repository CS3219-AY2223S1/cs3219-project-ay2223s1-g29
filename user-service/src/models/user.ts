import mongoose from 'mongoose';

export interface User {
  _id?: string;
  username: string;
  password: string;
}

export interface UserUpdateOptions {
  password?: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model<User>('user', userSchema);
