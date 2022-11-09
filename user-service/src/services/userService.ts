import { logger } from '../loggers/logger';
import { UserUpdateOptions } from '../models/user';
import UserRepo from '../repository/userRepo';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Exception } from '../exceptions';

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
  try {
    const newUser = await UserRepo.createUser({
      username,
      password: hashedPassword,
    });
    if (!newUser) {
      throw new Exception(`Failed to create user with username: ${username}`, 400);
    }
    return {
      token: generateJWT(username),
      id: newUser._id,
      username: newUser.username,
    };
  }
  catch (err) {
    throw new Exception(`username: ${username} is already taken`, 400);
  }
};

const updateUser = async (username: string, updatedUserFields: UserUpdateOptions) => {
  logger.info(`Updating user with id: ${username}`);
  if (updatedUserFields.password) {
    updatedUserFields.password = await bcrypt.hash(updatedUserFields.password, ROUNDS);
  }
  const updatedUser = await UserRepo.updateUser(username, updatedUserFields);
  if (!updatedUser) {
    throw new Exception(`Failed to update user with id: ${username}`, 404);
  }
  return updatedUser;
};

const login = async (username: string, password: string) => {
  logger.info(`Logging in username: ${username}`);
  const user = await UserRepo.getUser(username);
  if (!user) {
    throw new Exception(`Failed to get user with id: ${username}`, 404);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Exception(`Incorrect password for username: ${username}`, 401);
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
    throw new Exception(`Failed to delete ${username}'s account`, 404);
  }
  if (deletedUser.deletedCount === 0) {
    throw new Exception(`${username}'s account does not exist!`, 404);
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
