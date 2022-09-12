import { logger } from '../loggers/logger';
import { UserUpdateOptions } from '../models/user';
import UserRepo from '../repository/userRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ROUNDS = 10;

const generateJWT = (username: string) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '6h',
  });
  return token;
};

const register = async (username: string, password: string) => {
  logger.info(`Creating user with username: ${username}`);
  let hashedPassword = await bcrypt.hash(password, ROUNDS);
  const newUser = await UserRepo.register({
    username,
    password: hashedPassword,
  });
  if (!newUser) {
    throw new Error(`Failed to create user with username: ${username}`);
  }
  return {
    token: generateJWT(username),
    id: newUser._id,
    username: newUser.username,
  };
};

const updateUser = async (username: string, updatedUserFields: UserUpdateOptions) => {
  logger.info(`Updating user with id: ${username}`);
  const updatedUser = await UserRepo.updateUser(username, updatedUserFields);
  if (!updatedUser) {
    throw new Error(`Failed to update user with id: ${username}`);
  }
  return updatedUser;
};

const login = async (username: string, password: string) => {
  logger.info(`Logging in username: ${username}`);
  const user = await UserRepo.getUser(username);
  if (!user) {
    throw new Error(`Failed to get user with id: ${username}`);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error(`Incorrect password for username: ${username}`);
  }
  return {
    token: generateJWT(username),
    id: user._id,
    username: user.username,
  };
};

const deleteUser = async (username: string) => {
  logger.info(`Deleting ${username}'s account`);
  const deletedUser = await UserRepo.deleteUser(username);
  if (!deletedUser) {
    throw new Error(`Failed to delete ${username}'s account`);
  }
  if (deletedUser.deletedCount === 0) {
    throw new Error(`${username}'s account does not exist!`);
  }
  return deletedUser;
};

const UserService = {
  register,
  login,
  updateUser,
  deleteUser,
};

export { UserService as default };
